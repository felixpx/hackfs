/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domain: ["ipfs.moralis.io"],
  },
  env: {
    // APP ID & SERVER URL
    NEXT_APP_WHEREBY_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNjU3OTAxODg5LCJvcmdhbml6YXRpb25JZCI6MTY0NDAzLCJqdGkiOiI2OTUxYWQ1OS00M2RhLTQ4MTMtYTA0ZC03MzZkN2RhOGQzOTEifQ.adQwt-AyjerhJWc7gk2nllHRcyxIHHy0JzFjCjkeaYA",
  },
};
