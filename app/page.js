'use client'
import { useEffect } from "react";

export default function Home() {
  const fetchData = async () => {
    await fetch("/api/songs")
  }

  useEffect(() => {
    fetchData()
  })

  return (
    <div className="grid-container">
      <div className="menu">
        <ul>
          <li>
            <a
              href="#"
              className="hover:font-black dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:font-black dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Search
            </a>
          </li>
        </ul>
      </div>
      <div className="main-view"></div>
      <div className="bottom-menu"></div>
      <div className="now-playing-bar"></div>
    </div>
  );
}
