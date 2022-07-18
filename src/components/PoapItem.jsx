/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const people = [
  {
    name: "Pro Subscription",
    title: "0x1b1...8997",
    role: "Pro",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Meeting Title",
    title: "0x1b1...8997",
    role: "Private",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Meeting Title",
    title: "0x1b1...8997",
    role: "Private",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Meeting Title",
    title: "0x1b1...8997",
    role: "Private",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Meeting Title",
    title: "0x1b1...8997",
    role: "Private",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Meeting Title",
    title: "0x1b1...8997",
    role: "Private",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },

  // More people...
];

export default function PoapItem() {
  const { Moralis } = useMoralis();

  const [poaps, setPoaps] = useState();

  useEffect(() => {
    const Poaps = Moralis.Object.extend("Poaps");
    const query = new Moralis.Object("Poaps");
    query.find().then((result) => {
      setPoaps(result);
    });
  }, []);
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {poaps.map((props) => (
        <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
          <div className="flex-1 flex flex-col p-8">
            {/* <img
              className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
              src={person.imageUrl}
              alt=""
            /> */}
            <h3 className="mt-6 text-gray-900 text-sm font-medium">
              {props.name}
            </h3>
            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-gray-500 text-sm">{props.sender}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  {props.type}
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
