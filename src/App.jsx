import { useEffect, useRef, useState } from "react";
import "./App.css";
import { URL } from "./constants";
import RecentSearch from "./components/RecentSearch";
import QuestionAnswer from "./components/QuestionAnswer";
import SignUp from "./components/SignUp";
import VoiceChat from "./components/VoiceChat";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history"))
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);
  const [darkMode, setDarkMode] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const askQuestion = async () => {
    if (!question && !selectedHistory) return false;

    if (question) {
      let history = JSON.parse(localStorage.getItem("history")) || [];
      history = [question, ...history];
      localStorage.setItem("history", JSON.stringify(history));
      setRecentHistory(history);
    }

    const payloadData = question ? question : selectedHistory;
    const payload = {
      contents: [{ parts: [{ text: payloadData }] }],
    };

    setLoader(true);
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ").map((item) => item.trim());

    setResult((prev) => [
      ...prev,
      { type: "q", text: question ? question : selectedHistory },
      { type: "a", text: dataString },
    ]);
    setQuestion("");

    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);
    setLoader(false);
  };

  const isEnter = (event) => {
    if (event.key === "Enter") askQuestion();
  };

  useEffect(() => {
    if (selectedHistory) askQuestion();
  }, [selectedHistory]);

  // 🌓 Dark mode
  useEffect(() => {
    if (darkMode === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div
      className={`${
        darkMode === "dark" ? "dark" : ""
      } w-screen h-screen overflow-hidden`}
    >
      <SignUp />

      {/* 🟢 Header */}
      <header className="md:hidden flex items-center justify-between p-3 border-b dark:border-zinc-700 bg-white dark:bg-zinc-900">
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
          className="p-2 rounded-md focus:outline-none focus:ring"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        

        {/* 🌓 Dark mode (mobile) */}
        <div className="hidden md:block fixed top-20 right-5 z-30">
         <select
         onChange={(e) => setDarkMode(e.target.value)}
         value={darkMode}
         className={`p-2 rounded-md border text-sm ${
         darkMode === "dark"
         ? "text-white bg-zinc-800 border-zinc-700"
         : "text-black bg-white border-zinc-300"
       }`}>
         <option value="dark">Dark</option>
         <option value="light">Light</option>
        </select>
       </div>

      </header>

      {/* 🧩 Main layout (grid, fixed height) */}
      <div className="grid grid-cols-1 md:grid-cols-5 h-[calc(100vh-56px)] md:h-screen">
        {/* Sidebar */}
        <aside
          className={`bg-white dark:bg-zinc-800 md:col-span-1 z-30 transform transition-transform 
            ${
              sidebarOpen
                ? "fixed inset-0 w-4/5 max-w-xs md:static"
                : "hidden md:block"
            }`}
        >
          <div className="h-full p-3 md:pt-5 md:h-screen overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between md:hidden mb-2">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Recent
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>

            <RecentSearch
              recentHistory={recentHistory}
              setRecentHistory={setRecentHistory}
              setSelectedHistory={(h) => {
                setSelectedHistory(h);
                setSidebarOpen(false);
              }}
              darkMode={darkMode}
            />
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="md:col-span-4 flex flex-col items-center p-4 md:p-10 text-center h-full overflow-hidden">
  
  {/* Desktop Dark mode selector */}
  <div className="hidden md:block fixed top-4 right-4 z-30">
    <select
      onChange={(e) => setDarkMode(e.target.value)}
      value={darkMode}
      className={`p-2 rounded-md border text-sm ${
        darkMode === "dark"
          ? "text-white bg-zinc-800 border-zinc-700"
          : "text-black bg-white border-zinc-300"
      }`}
    >
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  </div>

  {/* Heading */}
  <h1 className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-blue-700 mb-3">
    Hello User, Ask me Anything
  </h1>

  {/* Loader */}
  {loader && (
    <div role="status" className="my-2">
      <svg
        aria-hidden="true"
        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
        viewBox="0 0 100 101"
      >
        <path
          d="M100 50.5908C100 78.2051..."
          fill="currentColor"
        />
      </svg>
    </div>
  )}

  {/* ✅ Scrollable Q/A Section only */}
  <div
    ref={scrollToAns}
    className="flex-1 w-full md:w-3/4 overflow-y-auto scrollbar-hide px-2 pb-4"
  >
    <ul className="dark:text-zinc-300 text-zinc-800 space-y-2">
      {result.map((item, idx) => (
        <QuestionAnswer key={idx} item={item} idx={idx} />
      ))}
    </ul>
  </div>

  {/* ✅ Fixed Input Bar (always visible at bottom) */}
  <div className="sticky bottom-0 w-full md:w-1/2 dark:bg-zinc-800 bg-white p-1 pr-5 dark:text-white text-zinc-800 rounded-4xl border border-zinc-700 flex h-14 shadow-lg">
    <input
      type="text"
      value={question}
      onKeyDown={isEnter}
      onChange={(event) => setQuestion(event.target.value)}
      className="w-full h-full p-3 outline-none bg-transparent"
      placeholder="Ask anything..."
    />
    <VoiceChat onResult={(transcript) => setQuestion(transcript)} />
  </div>
</main>

      </div>
    </div>
  );
}

export default App;
