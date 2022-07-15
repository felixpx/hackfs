export const MeetingContractAddress =
  "0x792f63dd3e25da1c3fdb9b4d2e97c40a2eebfa01";
export const MeetingContractABI = [
  "function subscribed() public view returns (bool)",
  "function subscribe() public ",
  "function createMeeting(string calldata _name, string calldata _uri, uint256 startDate, bool isPublic, uint256 cost) external onlyOwner returns(uint256 tokenId)",
  "function sendInvite(uint tokenId,address invitee) external",
  "function mintNFT(uint tokenId) external",
];
