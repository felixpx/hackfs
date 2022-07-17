import type { NextPage } from "next";
import Head from "next/head";
import Login from "../../src/components/Login";
import Recordings from "../../src/components/Recordings";
import { useMoralis } from "react-moralis";
import Header from "../../src/components/Header";

const Home: NextPage = () => {
  const { isAuthenticated } = useMoralis();

  if (!isAuthenticated) return <Login />;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Optik Videocall</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Recordings />
    </div>
  );
};

export default Home;
