import { useState } from "react";
import Recordings from "./Recordings";
import UploadVideo from "./UploadVideo";

const tabs = [
  { name: "Recordings", href: "#", current: true },
  { name: "Upload", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RecordingNavTab() {
  const [selectedTab, setSelectedTab] = useState("Recordings");

  const [search, setSearch] = useState(new Date());

  const updateSearch = async () => {
    setSearch(new Date());
  };
  return (
    <div className="bg-[#f5f5f5] p-18 h-screen flex flex-col items-center justify-center rounded-xl w-full sm:w-9/12 shadow-xl">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => selectedTab.name)}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className=" hidden sm:block">
        <nav
          className="absolute top-24 items-center z-20 rounded-lg shadow flex divide-x divide-gray-200"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <a
              key={tab.name}
              onClick={() => {
                setSelectedTab(tab.name);
              }}
              className={classNames(
                selectedTab == tab.name
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-8 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  selectedTab == tab.name ? "bg-indigo-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </a>
          ))}
        </nav>
      </div>
      <div hidden={selectedTab != "Recordings"}>
        <Recordings search={search} />
      </div>
      <div hidden={selectedTab != "Upload"}>
        <UploadVideo updateSearch={updateSearch} />
      </div>
    </div>
  );
}
