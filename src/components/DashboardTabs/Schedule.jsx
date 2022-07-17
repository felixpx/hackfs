import { useEffect, useState } from "react";
import { useMoralis, useMoralisFile } from "react-moralis";
import { NFTStorage } from "nft.storage";
import {
  MeetingContractAddress,
  MeetingContractABI,
} from "../Contracts/MeetingContract";
import Notification from "../Notification";
import { ethers } from "ethers";
import ScheduleCard from "./ScheduleCard";

export default function Videocalls(props) {
  const {
    Moralis,
    user,
    isAuthenticated,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
    web3,
  } = useMoralis();
  const { saveFile } = useMoralisFile();

  const [nftstorage] = useState(
    new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_API_KEY })
  );

  const [newDate, setNewDate] = useState([]);
  const [isPro, setIsPro] = useState(true);

  // NOTIFICATIONS functions
  const [notificationTitle, setNotificationTitle] = useState();
  const [notificationDescription, setNotificationDescription] = useState();
  const [dialogType, setDialogType] = useState(1);

  const [show, setShow] = useState(false);
  const [room, setRoom] = useState("");
  const [search, setSearch] = useState(new Date());

  const close = async () => {
    setShow(false);
  };

  async function sendNotifications(data) {
    Moralis.Cloud.run("getUser", { address: user.get("ethAddress") }).then(
      (results) => {
        results.forEach((result) => {
          const Message = new Moralis.Object.extend("Notifications");
          const message = new Message();
          message.set("from", user.get("ethAddress"));
          message.set("to", result.id);
          message.set("meetingName", data.get("meetingName"));
          message.set("meetingDate", new Date(data.get("meetingDate")));
          message.set("meetingFile", data.get("meetingFile"));
          message.set("meetingTitle", data.get("meetingTitle"));
          message.set("meetingDescription", data.get("meetingDescription"));
          message.set("tokenId", data.get("tokenId"));
          message.set(
            "team",
            data.get("team") ? data.get("team") : user.get("ethAddress")
          );
          message.set("room", data.get("room"));
          message.save().then(async (meeting) => {
            const address = ethers.utils.getAddress(meeting.get("to"));
            const conversation =
              await props.xmtpClient.conversations.newConversation(address);
            // Send a message
            try {
              await conversation.send(JSON.stringify(meeting));
            } catch (error) {}
          });
        });
      }
    );
  }

  async function addDate(e) {
    e.preventDefault();
    if (!isPro) {
      alert("need to have pro for scheduled calls.");
    } else {
      // store new date
      const team = user.get("teamName");
      let tokenId;
      const meetingDate = document.getElementById("newDate").value;
      const meetingCost = document.getElementById("meetingCost").value;
      const meetingName = document.getElementById("meetingName").value;
      const meetingDescription =
        document.getElementById("meetingDescription").value;
      const meetingFile = document.getElementById("meetingFile").files[0];

      let ipfsFile = "";

      if (meetingFile) {
        console.log("uploading meeting file");
        await saveFile("meetingFile", meetingFile, { saveIPFS: true }).then(
          async (hash) => {
            console.log(hash);
            ipfsFile = hash._ipfs;
          }
        );
      }

      // NFT STORAGE
      const metadata = await nftstorage.store({
        name: meetingName,
        description: meetingDescription,
        image: meetingFile,
        properties: {
          date: newDate,
          price: meetingCost,
        },
      });

      // TIME FORMATTING
      const date = new Date(meetingDate);

      // CONTRACT CALL

      try {
        const MeetingContract = new ethers.Contract(
          MeetingContractAddress,
          MeetingContractABI,
          web3.getSigner()
        );
        let transaction = await MeetingContract.createMeeting(
          meetingName,
          metadata.url,
          date.getTime(),
          true,
          meetingCost
        );

        const receipt = await transaction.wait();
        // console.log(receipt.logs)
        let abi = [
          "event MeetingCreated(uint256 tokenId,string name,address owner,uint256 dateCreated,uint256 startDate,bool isPublic,uint256 cost)",
        ];

        let iface = new ethers.utils.Interface(abi);
        let log = iface.parseLog(receipt.logs[0]); // here you can add your own logic to find the correct log
        console.log(log.args);

        tokenId = log.args.tokenId.toString();
        console.log(tokenId);

        const result = await Moralis.Cloud.run("createMeeting", {
          endDate: "2099-02-18T14:23:00.000Z",
        });

        console.log(result.data);

        const Schedule = new Moralis.Object.extend("Schedules");
        const schedule = new Schedule();
        schedule.set("room", result);
        schedule.set("team", team);
        schedule.set("tokenId", tokenId);
        schedule.set("meetingDate", meetingDate);
        schedule.set("meetingName", meetingName);
        schedule.set("meetingCost", meetingCost);
        schedule.set("meetingFile", ipfsFile);
        schedule.set("user", user.id);
        schedule.save().then((data) => {
          setDialogType(1); //Success
          setNotificationTitle("Successful");
          setNotificationDescription("Successfully Created.");
          setShow(true);
          setSearch(new Date());
          sendNotifications(data);
        });
      } catch (error) {
        setDialogType(2); // Failed
        setNotificationTitle("Failed");
        setNotificationDescription(error.message);
        setShow(true);
      }
    }
  }

  // QUERY CLASS "SCHEDULE" FROM MORALIS
  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    const Schedule = Moralis.Object.extend("Schedules");
    const query = new Moralis.Query(Schedule);
    query.equalTo("user", user.id);
    query.descending("meetingDate");
    query.find().then((result) => {
      setNewDate(result);
      console.log(result);
    });
  }, [user, search]);
  console.log(props.xmtpClient?.conversations);
  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden w-full">
      <Notification
        type={dialogType}
        show={show}
        close={close}
        title={notificationTitle}
        description={notificationDescription}
      />
      <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Schedule
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Organize your scheduled calls.
            </p>
            <br></br>
            <hr></hr>
            <p className="mt-1 text-xs text-gray-500">
              Pro features include: unlimited calls, unlimited storing of past
              calls on ipfs with timestamps for reviewing specific parts of
              meetings, poaps for team members and direct messaging features via
              xmtp.
            </p>
            <br></br>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* NAME */}
          <div className="col-span-3 sm:col-span-2">
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700"
            >
              Add Meeting for {user.get("teamName")}
            </label>
            <div className="mt-1 rounded-md shadow-sm flex">
              <input
                type="datetime-local"
                name="newDate"
                id="newDate"
                className={` focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300`}
              />
            </div>

            <div className="mt-1 rounded-md shadow-sm flex">
              <input
                type="text"
                name="meetingName"
                id="meetingName"
                placeholder="Title"
                className={` focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300`}
              />
            </div>
            <div className="mt-1 rounded-md shadow-sm flex">
              <input
                type="text"
                name="meetingDescription"
                id="meetingDescription"
                placeholder="Description"
                className={` focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300`}
              />
            </div>
            <div className="mt-1 rounded-md shadow-sm flex">
              <input
                type="number"
                name="meetingCost"
                id="meetingCost"
                placeholder="Cost"
                className={` focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300`}
              />
            </div>
            <div className="mt-1 rounded-md shadow-sm flex">
              <input
                type="file"
                name="meetingFile"
                id="meetingFile"
                placeholder="Title"
                className={` focus:ring-indigo-500 py-2 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none bg-transparent rounded-r-md sm:text-sm border-gray-300`}
              />
            </div>

            <button
              onClick={addDate}
              className={`mt-4 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              Create Meeting
            </button>
          </div>
        </div>
      </div>
      {/* Members */}
      <label className="ml-2 block text-sm font-medium text-gray-700">
        Upcoming Dates
      </label>
      <ul
        role="list"
        className="m-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
      >
        {newDate.map((data, index) => {
          return (
            <ScheduleCard data={data} key={index} />

            // <span className="bg-gray-50 mb-2 h-10 border border-gray-300 rounded-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
            //   {data.get("meetingDate")}
            // </span>
          );
        })}
        {/* <span className="bg-gray-50 mb-2 h-10 border border-gray-300 rounded-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                20.07.2022
              </span> */}
      </ul>
    </div>
  );
}
