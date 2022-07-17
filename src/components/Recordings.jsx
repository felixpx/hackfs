import { useRef } from "react";
import { useMoralis } from "react-moralis";
import { MeetingContractAddress } from "../../src/components/Contracts/MeetingContract";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Recordings() {
  const { Moralis } = useMoralis();
  const router = useRouter();

  const videoRef = useRef();
  const videoUrl = useRef();
  const [data, setData] = useState();
  const { id } = router.query;

  useEffect(() => {
    const Schedules = new Moralis.Object.extend("Schedules");
    const query = new Moralis.Query(Schedules);
    query.equalTo("objectId", id);
    query.first().then((result) => {
      setData(result);
      console.log(room);
    });
  }, []);

  return (
    <div>
      <h3 className="text-lg leading-6 py-8 font-medium text-gray-900">
        Videocall Recordings
      </h3>
      <p className="flex-shrink-0 inline-block px-2 mb-8 py-0.5 text-green-800 text-xs font-sm bg-green-100 rounded-full">
        Powered By Optik
      </p>
      <div className="items-center flex mb-8 flex-col">
        <video width="640" height="480" controls ref={videoRef}>
          {" "}
        </video>
      </div>
      <ul
        role="list"
        className="pb-16 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {data.map((file) => (
          <li key={file.source} className="relative">
            <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
              <img
                src={file.source}
                alt=""
                className="object-cover pointer-events-none group-hover:opacity-75"
              />
              <button
                type="button"
                className="absolute inset-0 focus:outline-none"
              >
                <span className="sr-only">View details for {file.title}</span>
              </button>
            </div>
            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
              {file.title}
            </p>
            <p className="block text-sm font-medium text-gray-500 pointer-events-none">
              {file.size}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
