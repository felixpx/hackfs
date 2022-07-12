export default function PoapCard(props) {
  return (
    <div
      onClick={() => {
        alert("you particpated in this meeting");
      }}
      className="h-32 w-32 rounded-xl border-2 border-gray-200 flex flex-col items-center justify-evenly bg-[#f5f5f5] cursor-pointer"
    >
      <p>Team Name</p>
      <p>Meeting #</p>
      <p>22.07.2022</p>
    </div>
  );
}
