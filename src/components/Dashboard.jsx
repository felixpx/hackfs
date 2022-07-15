import {
  ArchiveIcon,
  CalendarIcon,
  InboxIcon,
  PlusCircleIcon,
  UserGroupIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { useState } from "react";

import Pro from "./DashboardTabs/Pro";
import Videocalls from "./DashboardTabs/Videocalls";
import Notifications from "./DashboardTabs/Notifications";
import Schedule from "./DashboardTabs/Schedule";
import Archive from "./DashboardTabs/Archive";
import Poaps from "./DashboardTabs/Poaps";

const navigation = [
  { name: "Pro", href: "#", icon: PlusCircleIcon, current: true },
  { name: "Videocalls", href: "#", icon: VideoCameraIcon, current: false },
  {
    name: "Notifications",
    icon: InboxIcon,
    current: false,
  },
  { name: "Schedule", href: "#", icon: CalendarIcon, current: false },
  { name: "Archive", href: "#", icon: ArchiveIcon, current: false },
  { name: "Poaps", href: "#", icon: UserGroupIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("Pro");

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
        <nav className="space-y-1">
          {navigation.map((tab) => (
            <a
              key={tab.name}
              onClick={() => {
                setSelectedTab(tab.name);
              }}
              className={classNames(
                selectedTab == tab.name
                  ? "bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white"
                  : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                "group cursor-pointer rounded-md px-3 py-2 flex items-center text-sm font-medium"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              <tab.icon
                className={classNames(
                  selectedTab == tab.name
                    ? "text-indigo-500 group-hover:text-indigo-500"
                    : "text-gray-400 group-hover:text-gray-500",
                  "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                )}
                aria-hidden="true"
              />
              <span className="truncate">{tab.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <div hidden={selectedTab != "Pro"}>
          <Pro />
        </div>
        <div hidden={selectedTab != "Videocalls"}>
          <Videocalls />
        </div>
        <div hidden={selectedTab != "Notifications"}>
          <Notifications />
        </div>
        <div hidden={selectedTab != "Schedule"}>
          <Schedule />
        </div>
        <div hidden={selectedTab != "Archive"}>
          <Archive />
        </div>
        <div hidden={selectedTab != "Poaps"}>
          <Poaps />
        </div>
      </div>
    </div>
  );
}
