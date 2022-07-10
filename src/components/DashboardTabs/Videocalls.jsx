import { useState } from "react";
import { useMoralis } from "react-moralis";

export default function Videocalls() {
  const { user } = useMoralis();
  const [isPro, setIsPro] = useState(false);

  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden w-full">
      <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Videocalls
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Set up a group call with your friends or organisation.
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

        <div className="flex flex-col space-y-4 items-center justify-center ">
          {/* NAME */}
          <div className="col-span-3 sm:col-span-2">
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700"
            >
              {user.get("teamName")}
            </label>
          </div>

          {/* EMBED VIDEOPLAYER */}
          <div className="bg-black h-96 w-full text-white justify-center items-center flex flex-col">
            This is the video player
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        {!isPro ? (
          <button
            // onClick={mintProSubscription}
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start
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
