import { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import { useNFTBalance } from "../hooks/useNFTBalance";

export default function PoapItem() {
  const { Web3API } = useMoralisWeb3Api();

  const [poaps, setPoaps] = useState([]);

  const { getNFTBalance, NFTBalance, error, isLoading } = useNFTBalance();

  // useEffect(() => {
  //   const Poaps = Moralis.Object.extend("Poaps");
  //   const query = new Moralis.Query(Poaps);
  //   query.find().then((result) => {
  //     setPoaps(result);
  //   });
  // }, []);

  useEffect(() => {
    const fetchNFTs = async () => {
      const testnetNFTs = await Web3API.account.getNFTs({
        chain: "mumbai",
      });
      //console.log(testnetNFTs);
      let _poaps = [];
      testnetNFTs.result.forEach((nft) => {
        if (nft.token_address == "0x318a3dc9f57a81c7ee34f9e010674082139cc5da") {
          console.log(nft);
          _poaps.push(nft);
        }
      });
      setPoaps(_poaps);
    };
    fetchNFTs();
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
            <h3 className="my-2 text-gray-900 text-xs">{data.name}</h3>
            <img
              className="w-42 h-32 mx-auto rounded-full"
              src={data.token_uri.image}
              alt="token-uri"
            />
            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dd className="mt-3">
                <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  {data.description}
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
