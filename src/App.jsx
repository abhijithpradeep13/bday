import { useCallback, useState } from "react";
import { StoryIntro, LandingPage, HuntPage, FinalPage } from "./components";

const PAGE_FADE_DURATION = 700;

export default function App() {
  const [page, setPage] = useState("intro"); // intro | landing | hunt | final
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [solvedClues, setSolvedClues] = useState([]);

  const navigateToPage = useCallback((nextPage) => {
    setIsPageVisible(false);

    setTimeout(() => {
      setPage(nextPage);
      requestAnimationFrame(() => {
        setIsPageVisible(true);
      });
    }, PAGE_FADE_DURATION);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#000", overflow: "hidden" }}>
      <div
        style={{
          minHeight: "100vh",
          opacity: isPageVisible ? 1 : 0,
          transition: `opacity ${PAGE_FADE_DURATION}ms ease-in-out`,
        }}
      >
      {page === "intro" && (
        <StoryIntro onComplete={() => navigateToPage("landing")} />
      )}
      {page === "landing" && (
        <LandingPage onStart={() => navigateToPage("hunt")} />
      )}
      {page === "hunt" && (
        <HuntPage
          initialSolved={solvedClues}
          onComplete={() => navigateToPage("final")}
        />
      )}
      {page === "final" && (
        <FinalPage />
      )}
      </div>
    </div>
  );
}
