import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export default function PoapItem() {
  const { Moralis } = useMoralis();

  const [poaps, setPoaps] = useState([]);

  useEffect(() => {
    const Poaps = Moralis.Object.extend("Poaps");
    const query = new Moralis.Query(Poaps);
    query.find().then((result) => {
      setPoaps(result);
    });
  }, []);

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {poaps.map((data, index) => (
        <li
          key={index}
          className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div className="flex-1 flex flex-col p-8">
            <img
              className="w-42 h-32 mx-auto rounded-full"
              src={
                data.get("type") == "Pro" ? "/optik-logo.png" : data.get("img")
              }
              alt=""
            />
            <h3 className="mt-6 text-gray-900 text-sm font-medium">
              {data.get("name")}
            </h3>
            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-gray-500 text-sm">{data.get("sender")}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  {data.get("type")}
                </span>
              </dd>
            </dl>
          </div>
          <div></div>
        </li>
      ))}
    </ul>
  );
}
