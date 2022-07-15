import Image from "next/image";
import { useRouter } from "next/router";

export default function ScheduleCard(props) {
  const router = useRouter();

  function viewMeeting(e) {
    // e.preventDefault();
    router.push(`/hostmeeting/${props.data.id}`);
  }
  return (
    <div>
      {/* <Image src={props.data.get("meetingFile")} width={20} height={20} /> */}

      <span
        onClick={viewMeeting}
        className="bg-gray-50 mb-2 h-10 border border-gray-300 rounded-md px-3 inline-flex items-center text-gray-500 sm:text-sm"
      >
        {props.data.get("meetingName")} - {props.data.get("meetingDate")}
      </span>
    </div>
  );
}
