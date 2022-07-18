import { useMoralis } from "react-moralis";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import PoapItem from "./PoapItem";

TimeAgo.addLocale(en);

export default function PoapCP() {
  const { Moralis, user } = useMoralis();

  const [poaps, setPoaps] = useState([]);
  const router = useRouter();

  //Live Query for Notifications
  //   useEffect(() => {
  //     async function getNotifications() {
  //       const Notification = Moralis.Object.extend("Notification");
  //       const query = new Moralis.Query(Notification);
  //       query.equalTo("to", user);
  //       query.descending("createdAt");
  //       subscribeToNotifications.current = await query.subscribe();
  //       subscribeToNotifications.current.on("create", (object) => {
  //         setUpdateNotifications(new Date());
  //       });
  //     }
  //     if (user) getNotifications();

  //     return function cleanup() {
  //       if (subscribeToNotifications.current)
  //         subscribeToNotifications.current.unsubscribe();
  //     };
  //   }, [user]);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white">
      <div className="flex flex-1 flex-col overflow-y-auto py-2">
        {/* <div className="flex flex-row items-center justify-center  space-x-4 border-2 border-gray-200 rounded-xl h-96"> */}
        {/* <PoapItem /> */}

        {/* {poaps.map((poapItem) => (
              <li
                key={poapItem.id}
                className="cursor-pointer py-4"
                onClick={() => viewPoap(poapItem)}
              >
                <div className="flex space-x-3">
                  <img
                    className="h-6 w-6 rounded-full"
                    src={poapItem.get("from").get("profileImg")}
                    alt=""
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                   
                    </div>
                    <p className="text-sm text-gray-300">
                      {poapItem.get("poap")}
                    </p>
                  </div>
                </div>
              </li>
            ))} */}
        {/* </div> */}
      </div>
    </div>
  );
}
