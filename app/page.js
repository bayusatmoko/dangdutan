export default function Home() {
  return (
    <div className="grid-container">
      <div className="menu">
        <ul>
          <li>
            <a
              href="#"
              class="hover:font-black dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              class="hover:font-black dark:hover:bg-gray-600 dark:hover:text-white"
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
