import { useMoralis } from "react-moralis";

export default function UploadVideo() {
  const { Moralis } = useMoralis();

  async function upload() {
    const videoFile = document.getElementById("videoFile").file[0];
  }
  return (
    <div>
      <p> Upload Video</p>
      <input type="file" id="videoFile" name="videoFile" />
      <button onClick={upload}>save</button>
    </div>
  );
}
