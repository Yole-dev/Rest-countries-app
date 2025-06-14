import { useEffect, useState } from "react";

export default function Home() {
  const [activeTheme, setActiveTheme] = useState(false);
  const [input, setInput] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  // initial data fetch
  useEffect(() => {
    async function fetchAllCountries() {
      try {
        setError(null);

        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population"
        );
        if (!res.ok)
          throw new Error("An error occured fetching the countries data");

        const data = await res.json();
        setCountryData(data);
      } catch (err) {
        setError(err.message);
        setCountryData([]);
      }
    }

    fetchAllCountries();
  }, []);

  // fetch based on search Input
  useEffect(() => {
    if (query === "") return;

    async function fetchByQuery() {
      try {
        setError(null);

        const res = await fetch(`https://restcountries.com/v3.1/name/${query}`);
        if (!res.ok) throw new Error("Country not found");

        const data = await res.json();
        setCountryData(data);
      } catch (err) {
        setError(err.message);
        setCountryData([]);
      }
    }

    fetchByQuery();
  }, [query]);

  function handleThemeToggle() {
    setActiveTheme(!activeTheme);
  }

  function handleSearch() {
    setQuery(input.trim());
    setInput("");
  }

  return (
    <section
      className={`w-svw flex flex-col gap-[2rem] ${
        !activeTheme ? "bg-very-dark-blue" : "bg-very-light-gray"
      } font-nunito ${
        !activeTheme ? "text-custom-white" : "text-very-dark-blue-x"
      }   text-[16px]`}
    >
      <Header active={activeTheme} onToggle={handleThemeToggle} />
      <Body
        active={activeTheme}
        countries={countryData}
        setError={setError}
        setCountryData={setCountryData}
      >
        <SearchBar
          active={activeTheme}
          input={input}
          setInput={setInput}
          onSearch={handleSearch}
        />
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

function Body({ children, active, countries, setError, setCountryData }) {
  return (
    <section className=" w-full flex flex-col items-center gap-[3rem] ">
      {children}

      <FilterTab
        active={active}
        setError={setError}
        setCountryData={setCountryData}
      />

      <Countries>
        <Country active={active} countries={countries} />
      </Countries>
    </section>
  );
}

function SearchBar({ active, input, setInput, onSearch }) {
  return (
    <div
      className={`w-[90%] h-[80px] flex items-center gap-[1rem] px-[1.5rem] ${
        !active ? "bg-dark-blue" : "bg-custom-white"
      } text-[16px] rounded-[0.7rem] shadow-2xl `}
    >
      <span className="cursor-pointer" onClick={onSearch}>
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

function FilterTab({ active, setError, setCountryData }) {
  const [regionFilter, setRegionFilter] = useState("Filter by Region");
  const [isOpen, setIsOpen] = useState(false);

  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  // fetch based on Region
  useEffect(() => {
    async function fetchByRegion() {
      try {
        setError(null);
        const res = await fetch(
          `https://restcountries.com/v3.1/region/${regionFilter}`
        );
        if (!res.ok) throw new Error("No country in this Region");

        const data = await res.json();
        setCountryData(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchByRegion();
  }, [regionFilter, setCountryData, setError]);

  function handleFilterReset() {
    setRegionFilter("Filter by Region");
  }

  function handleFilterToggle() {
    setIsOpen(!isOpen);
    handleFilterReset();
  }

  return (
    <section
      className={`w-full flex flex-col gap-[0.4rem] ps-[1.5rem] ${
        isOpen ? "z-[99] relative" : ""
      } `}
    >
      <div
        className={`w-[60%] h-[70px] flex items-center justify-between ${
          !active ? "bg-dark-blue" : "bg-custom-white"
        } text-[16px] rounded-[0.5rem] px-[2rem] shadow-2xl`}
      >
        <p> {regionFilter} </p>

        <span
          className=" flex flex-col items-center cursor-pointer "
          onClick={handleFilterToggle}
        >
          {!isOpen ? (
            <ion-icon name="chevron-down-outline"></ion-icon>
          ) : (
            <ion-icon name="chevron-up-outline"></ion-icon>
          )}
        </span>
      </div>

      {isOpen && (
        <ul
          className={`w-[60%] flex flex-col gap-[1rem] ps-[2rem] py-[2rem] ${
            !active ? "bg-dark-blue" : "bg-custom-white"
          } text-[16px] rounded-[0.5rem] shadow-2xl `}
        >
          {regions.map((region, i) => (
            <li key={i} onClick={(e) => setRegionFilter(e.target.innerHTML)}>
              {region}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Countries({ children }) {
  return (
    <section className="w-full grid grid-cols-1 items-center gap-[2rem] px-[2rem] pb-[2rem] md:grid-cols-3 md:grid-rows-auto xl:grid-cols-4 ">
      {children}
    </section>
  );
}

function Country({ active, countries }) {
  return (
    <>
      {countries.map((country) => (
        <div
          key={country.name.common}
          className={`w-full flex flex-col items-center gap-[2rem]  ${
            !active ? "bg-dark-blue" : "bg-custom-white"
          } shadow-2xl rounded-[0.4rem] md:w-[350px] xl:w-[400px] `}
        >
          <img
            src={country.flags.png}
            alt="country flag"
            className=" w-full rounded-t-[0.4rem]"
          />

          <div className="w-full flex flex-col gap-[0.6rem] font-[600] text-[16px] capitalize px-[2rem] pb-[3rem]">
            <p className=" font-[800] text-[18px]"> {country.name.common} </p>

            <p className="pt-[1rem]">
              <span>population: </span>
              <span className="font-[300]">
                {" "}
                {country.population.toLocaleString()}
              </span>
            </p>

            <p>
              <span>region: </span>
              <span className="font-[300]"> {country.region} </span>
            </p>

            <p>
              <span>capital: </span>
              <span className="font-[300]">
                {" "}
                {country.capital?.[0] || "No Capital Available"}{" "}
              </span>
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
