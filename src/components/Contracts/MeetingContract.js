export const MeetingContractAddress =
  "0xfd329620F109efe762B7954184bCaA6F46ae963B";
export const MeetingContractABI = [
  "function subscribed() public view returns (bool)",
  "function subscribe() public ",
  "function createMeeting(string calldata _name, string calldata _uri, uint256 startDate, bool isPublic, uint256 cost) external onlyOwner returns(uint256 tokenId)",
  "function sendInvite(uint tokenId,address invitee) external",
  "function mintNFT(uint tokenId) external",
];
