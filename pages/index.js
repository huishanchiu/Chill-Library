import dynamic from "next/dynamic";

const RootApp = dynamic(() => import("../src/index"), { ssr: false });

const HomePage = () => {
  return <RootApp />;
};

export default HomePage;
