import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log("Toggle menu clicked!"); // Add this line
    setIsOpen(!isOpen);
  };

  return (
    <header className={`flex h-16 items-center justify-between bg-slate-900`}>
      <h1>Starry Skies</h1>
      <button
        className="flex h-8 w-8 flex-col justify-center space-y-1 transition-all duration-300 hover:cursor-pointer focus:outline-none"
        aria-label="Toggle Menu"
        onClick={toggleMenu}
      >
        <span
          className={`block h-0.5 w-8 bg-white transition-transform duration-300 ${
            isOpen ? "translate-y-2.5 rotate-45" : ""
          }`}
        ></span>
        <span
          className={`block h-0.5 w-8 bg-white transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`block h-0.5 w-8 bg-white transition-transform duration-300 ${
            isOpen ? "-translate-y-2.5 -rotate-45" : ""
          }`}
        ></span>
      </button>
    </header>
  );
}
