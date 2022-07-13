export default function Videochat() {
  return (
    <div className="w-full items-center justify-center">
      <iframe
        className="h-screen w-full"
        src="https://uplink.whereby.com/demo-5b838e9a-7a2b-4107-9e35-383a4a2d1f1d"
        allow="camera; microphone; fullscreen; speaker; display-capture"
      ></iframe>
    </div>
  );
}
