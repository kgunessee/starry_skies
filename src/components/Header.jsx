export default function Header({ handleToggleMenu, isMobileMenuOpen }) {
  return (
    <header
      className={`bg-card-background mx-2 mb-2 flex h-16 items-center justify-between rounded-md p-2`}
    >
      <div className={`flex items-center gap-2`}>
        <img
          src={"/Starry Skies Logo.svg"}
          alt={`Starry Skies Logo`}
          className={`h-12 w-12`}
        />
        <h1 className={`text-xl font-semibold`}>Starry Skies</h1>
      </div>

      <button
        className="z-[999] flex h-8 w-8 flex-col justify-center space-y-1 transition-all duration-300 hover:cursor-pointer focus:outline-none"
        aria-label="Toggle Menu"
        onClick={handleToggleMenu}
      >
        <span
          className={`block h-0.5 w-8 bg-white transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-y-1.5 rotate-45" : ""
          }`}
        ></span>
        <span
          className={`block h-0.5 w-8 bg-white transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`block h-0.5 w-8 bg-white transition-transform duration-300 ${
            isMobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
          }`}
        ></span>
      </button>
    </header>
  );
}
