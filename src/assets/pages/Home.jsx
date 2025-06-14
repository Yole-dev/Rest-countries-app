import { useState } from "react";

export default function Home() {
  const [activeTheme, setActiveTheme] = useState(false);

  function handleThemeToggle() {
    setActiveTheme(!activeTheme);
  }

  return (
    <section
      className={` w-svw h-svh flex flex-col gap-[2rem] ${
        !activeTheme ? "bg-very-dark-blue" : "bg-very-light-gray"
      } font-nunito ${
        !activeTheme ? "text-custom-white" : "text-very-dark-blue-x"
      }   text-[16px]`}
    >
      <Header active={activeTheme} onToggle={handleThemeToggle} />
      <Body active={activeTheme} />
    </section>
  );
}

function Header({ onToggle, active }) {
  return (
    <section
      className={` w-full h-[100px] flex justify-between items-center px-[1rem] ${
        !active ? "bg-dark-blue" : "bg-custom-white"
      } `}
    >
      <p className="text-[18px] font-[800] ">Where in the world?</p>

      <div className="flex items-center gap-[0.5rem]" onClick={onToggle}>
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

function Body() {
  return (
    <section className=" w-full flex flex-col gap-[2rem] pt-[3rem] "></section>
  );
}
