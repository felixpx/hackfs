import {
  ArchiveIcon,
  CalendarIcon,
  InboxIcon,
  PlusCircleIcon,
  UserGroupIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const navigation = [
  { name: "Pro", href: "#", icon: PlusCircleIcon, current: true },
  { name: "Videocalls", href: "#", icon: VideoCameraIcon, current: false },
  { name: "Schedules", href: "#", icon: CalendarIcon, current: false },
  { name: "Poaps", href: "#", icon: UserGroupIcon, current: false },
  { name: "Archive", href: "#", icon: ArchiveIcon, current: false },
  {
    name: "Notifications",
    icon: InboxIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const { Moralis } = useMoralis();
  const [isPro, setIsPro] = useState(false);

  function mintProSubscription(e) {
    e.preventDefault();
    setIsPro(true);
    // contractCall();
  }

  const [teamInfo, setTeamInfo] = useState([]);
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
    const name = document.getElementById("username").value;
    const member = document.getElementById("member").value;
    const member1 = document.getElementById("member1").value;
    const member2 = document.getElementById("member2").value;
    const member3 = document.getElementById("member3").value;

    // Save to Moralis Database

    const Team = Moralis.Object.extend("Teams");
    const team = new Team();

    // set & save team in database
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
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white"
                  : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? "text-indigo-500 group-hover:text-indigo-500"
                    : "text-gray-400 group-hover:text-gray-500",
                  "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                )}
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <div action="#" method="POST">
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
                    Pro features include: unlimited calls, unlimited storing of
                    past calls on ipfs with timestamps for reviewing specific
                    parts of meetings, poaps for team members and direct
                    messaging features via xmtp.
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
                    Team / Business / DAO
                  </label>
                  <div className="mt-1 rounded-md shadow-sm flex">
                    <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                      handle
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={teamName}
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
                  Buy Pro
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
        </div>

        {/* <form action="#" method="POST">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Notifications
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Provide basic informtion about the job. Be specific with the
                  job title.
                </p>
              </div>

              <fieldset>
                <legend className="text-base font-medium text-gray-900">
                  By Email
                </legend>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="h-5 flex items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-700"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start">
                      <div className="h-5 flex items-center">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="candidates"
                          className="font-medium text-gray-700"
                        >
                          Candidates
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start">
                      <div className="h-5 flex items-center">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="offers"
                          className="font-medium text-gray-700"
                        >
                          Offers
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset className="mt-6">
                <legend className="text-base font-medium text-gray-900">
                  Push Notifications
                </legend>
                <p className="text-sm text-gray-500">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label htmlFor="push-everything" className="ml-3">
                      <span className="block text-sm font-medium text-gray-700">
                        Everything
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label htmlFor="push-email" className="ml-3">
                      <span className="block text-sm font-medium text-gray-700">
                        Same as email
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label htmlFor="push-nothing" className="ml-3">
                      <span className="block text-sm font-medium text-gray-700">
                        No push notifications
                      </span>
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </form> */}
      </div>
    </div>
  );
}
