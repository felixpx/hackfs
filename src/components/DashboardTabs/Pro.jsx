import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export default function Pro() {
  const { Moralis, user } = useMoralis();
  const [isPro, setIsPro] = useState(false);

  function mintProSubscription(e) {
    e.preventDefault();
    setIsPro(true);
    // contractCall();
  }

  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const Team = Moralis.Object.extend("Teams");
    const query = new Moralis.Query(Team);
    query.find().then((results) => {
      let r = [];
      results.forEach((result) => {
        r.push({
          member: result.get("member"),
          member1: result.get("member1"),
          member2: result.get("member2"),
          member3: result.get("member3"),
          name: result.get("name"),
        });
      });
      setTeamName(r.name);
      console.log(r);
    });
  }, []);

  function saveInfo(e) {
    e.preventDefault();
    if (!isPro) {
      alert("must have pro.");
    }

    // team info
    const daoAddress = document.getElementById("daoAddress").value;
    const name = document.getElementById("username").value;
    const member = document.getElementById("member").value;
    const member1 = document.getElementById("member1").value;
    const member2 = document.getElementById("member2").value;
    const member3 = document.getElementById("member3").value;

    // Save to Moralis Database

    const Team = Moralis.Object.extend("Teams");
    const team = new Team();

    // set & save team in database
    user.set("teamName", name);
    user.set("daoAddress", daoAddress);
    user.save();
    team.set("daoAddress", daoAddress);
    team.set("name", name);
    team.set("member", member);
    team.set("member1", member1);
    team.set("member2", member2);
    team.set("member3", member3);
    team.save().then(() => {
      alert("saved!");
    });
  }
  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden">
      <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {isPro ? "Welcome to Pro " : "Pro Membership"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {!isPro
                ? "Set up a pro subscription for your DAO or business. Enjoy unlimited calls and special features. Total cost per year: 50 USDC"
                : "Edit your Team"}
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
          <div className="col-span-3 sm:col-span-2">
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700"
            >
              DAO Member Token Address
            </label>
            <div className="mt-1 rounded-md shadow-sm flex">
              <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                Address
              </span>
              <input
                type="text"
                name="daoAddress"
                id="daoAddress"
                disabled={!isPro}
                className={`${
                  !isPro && "cursor-not-allowed"
                } focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300`}
              />
            </div>
          </div>

          {/* NAME */}
          <div className="col-span-3 sm:col-span-2">
            <p className="mb-8 ">OR</p>
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700"
            >
              Custom Team
            </label>
            <div className="mt-1 rounded-md shadow-sm flex">
              <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                handle
              </span>
              <input
                type="text"
                name="username"
                id="username"
                value={user.get("teamName")}
                disabled={!isPro}
                className={`${
                  !isPro && "cursor-not-allowed"
                } focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300`}
              />
            </div>
          </div>

          {/* Members */}
          <div className="col-span-3 sm:col-span-2">
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700"
            >
              Members
            </label>
            <div className="mt-1 rounded-md shadow-sm flex">
              <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                Address
              </span>
              <input
                type="text"
                name="member"
                id="member"
                disabled={!isPro}
                className={`${
                  !isPro && "cursor-not-allowed"
                } focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300`}
              />
            </div>
            <div className="mt-1 rounded-md shadow-sm flex">
              <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                Address
              </span>
              <input
                type="text"
                name="member1"
                id="member1"
                disabled={!isPro}
                className={`${
                  !isPro && "cursor-not-allowed"
                } focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300`}
              />
            </div>
            <div className="mt-1 rounded-md shadow-sm flex">
              <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                Address
              </span>
              <input
                type="text"
                name="member2"
                id="member2"
                disabled={!isPro}
                className={`${
                  !isPro && "cursor-not-allowed"
                } focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300`}
              />
            </div>
            <div className="mt-1 rounded-md shadow-sm flex">
              <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                Address
              </span>
              <input
                type="text"
                name="member3"
                id="member3"
                disabled={!isPro}
                className={`${
                  !isPro && "cursor-not-allowed"
                } focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300`}
              />
            </div>
            <button
              type="button"
              disabled={!isPro}
              className={`mt-4 ${
                !isPro && "cursor-not-allowed"
              } bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              Add Member
            </button>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        {!isPro ? (
          <button
            onClick={mintProSubscription}
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Buy Pro First
          </button>
        ) : (
          <button
            onClick={saveInfo}
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
