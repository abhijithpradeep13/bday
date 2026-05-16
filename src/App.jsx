import { useState } from "react";
import { LandingPage, HuntPage, FinalPage } from "./components";

export default function App() {
  const [page, setPage] = useState("landing"); // landing | hunt | final
  const [solvedClues, setSolvedClues] = useState([]);

  return (
    <div style={{ minHeight: "100vh" }}>
      {page === "landing" && (
        // TO BE DISCARDED: Added onTestBypass prop for testing purposes
        <LandingPage onStart={() => setPage("hunt")} onTestBypass={() => setPage("final")} />
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
