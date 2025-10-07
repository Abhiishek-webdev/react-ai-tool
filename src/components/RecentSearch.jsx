// src/components/RecentSearch.jsx
import React from "react";

export default function RecentSearch({
  recentHistory,
  setRecentHistory,
  setSelectedHistory,
  darkMode,
}) {
  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };

  return (
    <div
      className={`w-full md:w-auto dark:bg-zinc-800 bg-white p-3 md:pt-5 md:h-screen overflow-y-auto rounded-md md:rounded-none shadow-sm md:shadow-none`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-300 dark:border-zinc-700 pb-2">
        <h1 className="text-lg sm:text-xl font-semibold dark:text-white text-zinc-800">
          Recent History
        </h1>

        {/* Clear button */}
        <button
          onClick={clearHistory}
          className="p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 -960 960 960"
            width="22px"
            className={`fill-current ${
              darkMode === "dark" ? "text-white" : "text-black"
            }`}
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>
      </div>

      {/* List */}
      <ul className="text-left overflow-auto mt-3 space-y-1 max-h-[70vh] md:max-h-[80vh]">
        {recentHistory && recentHistory.length > 0 ? (
          recentHistory.map((item, idx) => (
            <li
              key={idx}
              onClick={() => setSelectedHistory(item)}
              className="px-4 py-2 truncate dark:text-zinc-400 text-zinc-700 cursor-pointer rounded-md 
              dark:hover:bg-zinc-700 dark:hover:text-zinc-200 hover:bg-gray-100 hover:text-zinc-900 transition"
            >
              {item}
            </li>
          ))
        ) : (
          <p className="text-sm text-center text-gray-500 dark:text-zinc-500 py-3">
            No recent history
          </p>
        )}
      </ul>
    </div>
  );
}
