import { useState } from "react";
import { LandingPage, HuntPage, FinalPage } from "./components";

export default function App() {
  const [page, setPage] = useState("landing"); // landing | hunt | final
  const [solvedClues, setSolvedClues] = useState([]);

  return (
    <div style={{ minHeight: "100vh" }}>
      {page === "landing" && (
        <LandingPage onStart={() => setPage("hunt")} />
      )}
      {page === "hunt" && (
        <HuntPage
          initialSolved={solvedClues}
          onComplete={() => setPage("final")}
        />
      )}
      {page === "final" && (
        <FinalPage />
      )}
    </div>
  );
}
