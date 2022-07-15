/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domain: ["ipfs.moralis.io"],
  },
  env: {
    // APP ID & SERVER URL
    NEXT_APP_MORALIS_SERVER_URL: "",
    NEXT_APP_MORALIS_APP_ID: "",
    REACT_APP_NFT_STORAGE_API_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDM1OTMyM2U4OTZkMTUwMjAxRkFkODQ1MzE4RTZjOWM1NDkyRjEwN2YiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzMzM2ODk0OTI1OSwibmFtZSI6IlVuc3RvcHBhYmxlIFN0cmVhbXMifQ.aaXjhUhPFhOYQxdWeaQE0PV2chNvwWEYm9sVAppe4zY",
    NEXT_APP_WHEREBY_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNjU3OTAxODg5LCJvcmdhbml6YXRpb25JZCI6MTY0NDAzLCJqdGkiOiI2OTUxYWQ1OS00M2RhLTQ4MTMtYTA0ZC03MzZkN2RhOGQzOTEifQ.adQwt-AyjerhJWc7gk2nllHRcyxIHHy0JzFjCjkeaYA",
  },
};
