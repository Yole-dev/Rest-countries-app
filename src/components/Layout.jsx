export default function Layout({ children, activeTheme, setActiveTheme }) {
  function handleThemeToggle() {
    setActiveTheme(!activeTheme);
  }

  return (
    <section
      className={`w-full flex flex-col gap-[3rem] ${
        !activeTheme ? "bg-very-dark-blue" : "bg-very-light-gray"
      } font-nunito ${
        !activeTheme ? "text-custom-white" : "text-very-dark-blue-x"
      } `}
    >
      <Header active={activeTheme} onToggle={handleThemeToggle} />
      {children}
    </section>
  );
}

function Header({ onToggle, active }) {
  return (
    <section
      className={` w-full h-[100px] flex justify-between items-center px-[1rem] ${
        !active ? "bg-dark-blue" : "bg-custom-white"
      } shadow-2xl ${
        !active ? "shadow-very-dark-blue-x" : "shadow-dark-blue"
      }  xl:px-[4rem] `}
    >
      <p className="text-[18px] font-[800] xl:text-[20px] ">
        Where in the world?
      </p>

      <div
        className="flex items-center gap-[0.5rem] text-[16px] hover:text-dark-gray transition duration-300 ease-in-out cursor-pointer xl:text-[18px] "
        onClick={onToggle}
      >
        <span>
          {!active ? (
            <ion-icon name="moon-sharp"></ion-icon>
          ) : (
            <ion-icon name="sunny"></ion-icon>
          )}
        </span>

        <p className="font-[500]"> {!active ? "Dark Mode" : "Light Mode"} </p>
      </div>
    </section>
  );
}
