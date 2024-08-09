import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Jobs from "../components/Jobs";

function Home() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
  }, []);

  return (
    <>
      <Hero search={search} setSearch={setSearch} />
      <Jobs search={search} />
    </>
  );
}

export default Home;
