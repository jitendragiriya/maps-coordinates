import React from "react";
import { CiLight } from "react-icons/ci";

function Header({ isDarkMode, setIsDarkMode }) {
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    const newTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
    if (!isDarkMode)
      document.querySelector("body").style.backgroundColor = "#4f4f4f";
    else document.querySelector("body").style.backgroundColor = "#ffffff";
  };

  return (
    <header className="dark:bg-[#575757] bg-white p-4 shadow-sm dark:shadow-none sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold dark:text-white text-black">
          Maps
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-black text-white dark:bg-white dark:text-black"
          >
            <CiLight />
          </button>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="dark:text-white text-black transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="dark:text-white text-black  transition duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="dark:text-white text-black transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
