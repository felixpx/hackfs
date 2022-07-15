import { useEffect, useState } from "react";
import { useMoralis, useMoralisFile } from "react-moralis";
import { NFTStorage } from "nft.storage";

export default function Videocalls() {
  const {
    Moralis,
    user,
    isAuthenticated,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
  } = useMoralis();
  const { saveFile } = useMoralisFile();

  const [nftstorage] = useState(
    new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_API_KEY })
  );

  const [newDate, setNewDate] = useState();
  const [isPro, setIsPro] = useState(true);

  async function addDate(e) {
    e.preventDefault();
    if (!isPro) {
      alert("need to have pro for scheduled calls.");
    } else {
      // store new date
      const team = user.get("teamName");
      const tokenId = user.get("daoAddress");
      const newDate = document.getElementById("newDate").value;
      const meetingCost = document.getElementById("meetingCost").value;
      const meetingName = document.getElementById("meetingName").value;
      const meetingDescription =
        document.getElementById("meetingDescription").value;
      const meetingFile = document.getElementById("meetingFile").files[0];

      let ipfsFile = "";

      if (meetingFile) {
        console.log("uploading xibit file");
        await saveFile("meetingFile", meetingFile, { saveIPFS: true }).then(
          async (hash) => {
            console.log(hash);
            ipfsFile = hash._ipfs;
          }
        );
      }

      const metadata = await nftstorage.store({
        name: meetingName,
        description: meetingDescription,
        image: meetingFile,
        properties: {
          date: newDate,
          price: meetingCost,
        },
      });

      console.log(metadata.url);
      console.log(metadata);

      // save new Date in Moralis
      const Schedule = new Moralis.Object.extend("Schedules");
      const schedule = new Schedule();

      schedule.set("team", team);
      schedule.set("tokenId", tokenId);
      schedule.set("newDate", newDate);
      schedule.set("meetingName", meetingName);
      schedule.set("meetingCost", meetingCost);
      schedule.set("meetingMetadata", metadata);
      // schedule.save().then(() => {
      //   alert("new Date added");
      // });
    }
  }

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    const Schedule = Moralis.Object.extend("Schedules");
    const query = new Moralis.Query(Schedule);
    // query.equalTo("owner", user.get("ethAddress"));
    query.equalTo("tokenId", user.get("daoAddress"));
    query.find().then((result) => {
      setNewDate(result);
      console.log(result);
    });
  }, [user]);

  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden w-full">
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

          {/* Members */}
          <div className="col-span-3 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Upcoming Dates
            </label>
            <div className="mt-1 rounded-md shadow-sm flex">
              <span className="bg-gray-50 mb-2 h-10 border border-gray-300 rounded-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                20.07.2022
                {/* QUERY UPCOMING DATES */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
