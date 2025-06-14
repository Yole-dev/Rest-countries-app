import { useState } from "react";

export default function Home() {
  const [activeTheme, setActiveTheme] = useState(false);
  const [input, setInput] = useState("");

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
      <Body active={activeTheme}>
        <SearchBar active={activeTheme} input={input} setInput={setInput} />
      </Body>
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

function Body({ children, active }) {
  return (
    <section className=" w-full flex flex-col items-center gap-[2rem]  ">
      {children}
    </section>
  );
}

function SearchBar({ active, input, setInput }) {
  const query = input;

  return (
    <div
      className={`w-[90%] h-[80px] flex items-center gap-[1rem] px-[1.5rem] ${
        !active ? "bg-dark-blue" : "bg-custom-white"
      } text-[16px] rounded-[0.7rem] shadow-2xl `}
    >
      <span>
        <ion-icon name="search"></ion-icon>
      </span>

      <input
        type="text"
        placeholder="Search for a country..."
        className={` font-[500] ${
          !active ? " text-custom-white" : "text-dark-gray"
        } focus:outline-none`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
