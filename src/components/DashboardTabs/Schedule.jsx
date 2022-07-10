import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export default function Videocalls() {
  const {
    Moralis,
    user,
    isAuthenticated,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
  } = useMoralis();

  const [newDate, setNewDate] = useState();
  const [isPro, setIsPro] = useState(true);

  function addDate(e) {
    e.preventDefault();
    if (!isPro) {
      alert("need to have pro for scheduled calls.");
    } else {
      // store new date
      const team = user.get("teamName");
      const newDate = document.getElementById("newDate").value;

      // save new Date in Moralis
      const Schedule = new Moralis.Object.extend("Schedules");
      const schedule = new Schedule();

      schedule.set("team", team);
      schedule.set("newDate", newDate);
      schedule.save().then(() => {
        alert("new Date added");
      });
    }
  }

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();

    const Team = Moralis.Object.extend("Teams");
    const query = new Moralis.Query(Team);
    query.equalTo("owner", user.get("ethAddress"));
    query.equalTo("team", user.get("teamName"));
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
              Add Date for {user.get("teamName")}
            </label>
            <div className="mt-1 rounded-md shadow-sm flex">
              <input
                type="date"
                name="newDate"
                id="newDate"
                className={` focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300`}
              />
            </div>
            <button
              onClick={addDate}
              className={`mt-4 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              Add Date
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
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        {!isPro ? (
          <button
            // onClick={mintProSubscription}
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Schedule Call
          </button>
        ) : (
          <button
            // onClick={saveInfo}
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
