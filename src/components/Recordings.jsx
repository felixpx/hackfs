import { useRef } from "react";
import { useMoralis } from "react-moralis";
import UploadVideo from "../components/UploadVideo";

const files = [
  {
    title: "Meeting 31",
    size: "18.07.2022 - 4PM",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  },
  {
    title: "Meeting 57",
    size: "22.07.2022 - 6PM",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  },
  {
    title: "Meeting 27",
    size: "22.07.2022 - 6PM",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  },
  {
    title: "Meeting 17",
    size: "22.07.2022 - 6PM",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  },
];

export default function Recordings() {
  const { Moralis, user } = useMoralis();
  const videoUrl = useRef();
  const videoRef = useRef();

  return (
    <div className="bg-[#f5f5f5] p-18 flex flex-col items-center justify-center rounded-xl w-full sm:w-9/12 shadow-xl">
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
        {files.map((file) => (
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
      <UploadVideo />
    </div>
  );
}
