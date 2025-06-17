import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// imported custom hook
import { CountryContext } from "../hooks/CountryNameContext";

// imported component
import LoadingCircleSpinner from "../../components/loader";
import Page from "../../components/PageEntryAnimation";

export default function Home({ activeTheme }) {
  const [input, setInput] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // initial data fetch
  useEffect(() => {
    async function fetchAllCountries() {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllCountries();
  }, []);

  // fetch based on search Input
  useEffect(() => {
    if (query === "") return;

    async function fetchByQuery() {
      setIsLoading(true);
      try {
        setError(null);

        const res = await fetch(`https://restcountries.com/v3.1/name/${query}`);
        if (!res.ok) throw new Error("Country doesn't exist.");

        const data = await res.json();
        setCountryData(data);
      } catch (err) {
        setError(err.message);
        setCountryData([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchByQuery();
  }, [query]);

  function handleSearch() {
    setQuery(input.trim());
    setInput("");
  }

  return (
    <Page
      className={`w-svw flex flex-col items-center gap-[2rem] text-[16px] md:w-full `}
    >
      <Body
        active={activeTheme}
        countries={countryData}
        setError={setError}
        error={error}
        setCountryData={setCountryData}
        setIsLoading={setIsLoading}
        loading={isLoading}
      >
        <SearchBar
          active={activeTheme}
          input={input}
          setInput={setInput}
          onSearch={handleSearch}
        />
      </Body>
    </Page>
  );
}

function Body({
  children,
  active,
  countries,
  setError,
  error,
  setCountryData,
  setIsLoading,
  loading,
}) {
  return (
    <section className=" self-center w-[95%] flex flex-col items-center gap-[3rem] ">
      <div className=" w-full flex flex-col items-start gap-[2rem] px-[1.5rem] md:px-0 xl:flex-row xl:justify-between xl:items-center  ">
        {children}

        <FilterTab
          active={active}
          setError={setError}
          setCountryData={setCountryData}
          setIsLoading={setIsLoading}
        />
      </div>

      <Countries loading={loading} error={error} active={active}>
        <Country active={active} countries={countries} />
      </Countries>
    </section>
  );
}

function SearchBar({ active, input, setInput, onSearch }) {
  return (
    <div
      className={` w-[95%] h-[80px] self-center flex items-center gap-[1rem] px-[1.5rem] ${
        !active ? "bg-dark-blue" : "bg-custom-white"
      } text-[16px] rounded-[0.7rem] shadow-2xl  ${
        !active
          ? " shadow-very-dark-blue-x hover:shadow-xs hover:shadow-dark-gray "
          : "shadow-dark-gray hover:shadow-very-dark-blue-x"
      } md:w-[60%] md:self-start xl:w-[50%] xl:h-[70px] transition duration-300 ease-in-out `}
    >
      <span
        className="cursor-pointer hover:text-dark-gray transition duration-300 ease-in-out "
        onClick={onSearch}
      >
        <ion-icon name="search"></ion-icon>
      </span>

      <input
        type="text"
        placeholder="Search for a country..."
        className={` font-[500] ${
          !active ? " text-custom-white" : "text-dark-gray"
        } focus:outline-none  `}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}

function FilterTab({ active, setError, setCountryData, setIsLoading }) {
  const [regionFilter, setRegionFilter] = useState("Filter by Region");
  const [isOpen, setIsOpen] = useState(false);

  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  // fetch based on Region
  useEffect(() => {
    if (regionFilter === "Filter by Region") return;

    async function fetchByRegion() {
      setIsLoading(true);
      try {
        setError(null);
        const res = await fetch(
          `https://restcountries.com/v3.1/region/${regionFilter}`
        );
        if (!res.ok) throw new Error("Something went wrong while getting data");

        const data = await res.json();
        setCountryData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchByRegion();
  }, [regionFilter, setCountryData, setError, setIsLoading]);

  function handleFilterToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <section
      className={`w-full flex flex-col gap-[0.4rem] ${
        isOpen ? "z-[99] relative" : ""
      } xl:items-end `}
    >
      <div
        className={`w-[60%] h-[70px] flex items-center justify-between ${
          !active ? "bg-dark-blue" : "bg-custom-white"
        } text-[16px] rounded-[0.5rem] px-[2rem] shadow-2xl ${
          !active
            ? " shadow-very-dark-blue-x hover:shadow-xs hover:shadow-dark-gray "
            : "shadow-dark-gray hover:shadow-very-dark-blue-x"
        } transition duration-300 ease-in-out md:w-[30%]`}
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
          } text-[16px] rounded-[0.5rem] shadow-2xl ${
            !active
              ? " shadow-very-dark-blue-x hover:shadow-2xs hover:shadow-dark-gray "
              : "shadow-dark-gray hover:shadow-very-dark-blue-x"
          } md:w-[30%] transition duration-300 ease-in-out `}
        >
          {regions.map((region, i) => (
            <li
              key={i}
              onClick={(e) => setRegionFilter(e.target.innerHTML)}
              className="cursor-pointer hover:text-dark-gray transition duration-300 ease-in-out "
            >
              {region}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Countries({ children, loading, error, active }) {
  return (
    <section className="w-full min-h-[60svh] grid grid-cols-1 justify-center gap-[2rem] px-[2rem] pb-[2rem] md:grid-cols-3  md:grid-rows-auto md:px-0 xl:grid-cols-4 ">
      {loading && (
        <div className="col-span-full flex items-center justify-center">
          <LoadingCircleSpinner
            borderColor={`${active ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 98%)"}`}
          />
        </div>
      )}

      {error && !loading && (
        <p className="col-span-full h-[30svh] flex items-center justify-center text-[20px] text-red-400 text-center">
          {error}
        </p>
      )}

      {!loading && !error && children}
    </section>
  );
}

function Country({ active, countries }) {
  const { setCountry } = useContext(CountryContext);

  return (
    <>
      {countries.map((country) => (
        <div
          key={country.name.common}
          className={`w-full flex flex-col items-center gap-[2rem]  ${
            !active ? "bg-dark-blue" : "bg-custom-white"
          } shadow-2xl ${
            !active
              ? "shadow-very-dark-blue-x hover:shadow-dark-gray "
              : "shadow-dark-gray hover:shadow-very-dark-blue-x"
          }   rounded-[0.4rem] md:w-[220px] xl:w-[300px] transition duration-300 ease-in-out`}
        >
          <img
            src={country.flags.png}
            alt={country.flags.alt}
            className=" w-full rounded-t-[0.4rem] h-[210px] md:h-[146.44px] xl:h-[199.69px] "
          />

          <div className="w-full flex flex-col gap-[0.6rem] font-[600] text-[16px] capitalize px-[2rem] pb-[3rem] xl:text-[18px] ">
            <Link
              to="/country-detail"
              onClick={() => {
                setCountry(country.name.common);
                window.scrollTo(0, 0);
              }}
            >
              <p className=" font-[800] text-[18px] hover:text-dark-gray xl:text-[20px] transition duration-300 ease-in-out">
                {" "}
                {country.name.common}{" "}
              </p>
            </Link>

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
