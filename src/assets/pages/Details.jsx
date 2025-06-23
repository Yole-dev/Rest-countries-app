import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// imported custom hook
import { CountryContext } from "../hooks/CountryNameContext";

// imported component
import LoadingCircleSpinner from "../../components/loader";
import Page from "../../components/PageEntryAnimation";

export default function CountryDetail({ activeTheme }) {
  const [countryDetail, setCountryDetail] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // getting the country name using context
  const { country, setCountry } = useContext(CountryContext);

  // derived state
  const query = country;

  // first fetch based on
  useEffect(() => {
    if (!query) return;
    async function fetchByQuery() {
      setIsLoading(true);
      try {
        setError(null);

        const res = await fetch(`https://restcountries.com/v3.1/name/${query}`);
        if (!res.ok) throw new Error("Country doesn't exist.");

        const data = await res.json();
        setCountryDetail(data[0]);
        document.title = `${data[0].name.common} Details`;

        console.log(data[0]);
      } catch (err) {
        setError(err.message);
        setCountryDetail(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchByQuery();
  }, [query]);

  // second fetch based on country code
  useEffect(() => {
    if (countryCode === "") return;
    async function fetchByCodeQuery() {
      setIsLoading(true);
      try {
        setError(null);

        const res = await fetch(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        if (!res.ok) throw new Error("Country doesn't exist.");

        const data = await res.json();
        setCountryDetail(data[0]);
        setCountry(data[0].name.common);
        document.title = `${data[0].name.common} Details`;

        console.log(data[0]);
      } catch (err) {
        setError(err.message);
        setCountryDetail(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchByCodeQuery();
  }, [countryCode, setCountry]);

  return (
    <Page className=" w-full flex flex-col px-[1.5rem] pb-[2rem] gap-[3rem] xl:gap-[4rem] xl:px-[4rem]">
      <Link to="/">
        <button
          className={`flex gap-2 items-center justify-center font-[300] text-[16px] px-[2rem] py-[0.4rem] shadow-2xl shadow-dark-blue hover:shadow-very-dark-blue-x focus:outline-none ${
            !activeTheme ? "bg-dark-blue" : "bg-very-light-gray "
          } cursor-pointer shadow-2xl${
            !activeTheme
              ? "shadow-very-dark-blue-x hover:shadow-dark-gray "
              : "shadow-dark-gray hover:shadow-very-dark-blue-x"
          } xl:text-[18px] hover:text-dark-gray transition duration-300 ease-in-out`}
          onClick={() => {
            setCountry("");
            localStorage.removeItem("country");
          }}
        >
          <ion-icon name="arrow-back-outline"></ion-icon>
          <span>Back</span>
        </button>
      </Link>

      {isLoading && (
        <LoadingCircleSpinner
          borderColor={`${
            activeTheme ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 98%)"
          }`}
          className="container h-svh"
        />
      )}

      {error && !isLoading && (
        <p className="col-span-full h-svh flex items-center justify-center text-[20px] text-red-400 text-center">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <DetailsContainer
          country={countryDetail}
          setCountryCode={setCountryCode}
          active={activeTheme}
        />
      )}
    </Page>
  );
}

function DetailsContainer({ country, setCountryCode, active }) {
  function handleNeighbourCountryRouting(e) {
    setCountryCode(e.target.innerHTML);
    window.scrollTo(0, 0);
  }

  return (
    <section className=" w-full flex flex-col gap-[2rem] xl:h-svh xl:flex-row xl:justify-between ">
      <img
        src={country.flags?.png}
        alt={country.flags?.alt || "Flag"}
        className={`w-full h-[250px] shadow-2xl ${
          !active ? "shadow-very-dark-blue-x" : "shadow-dark-blue"
        } xl:w-[40%] xl:h-[350px] `}
      />

      <div className="flex flex-col gap-[2rem] capitalize xl:w-[50%]  ">
        <p className=" font-[800] text-[18px] xl:text-[25px] ">
          {" "}
          {country.name?.common}{" "}
        </p>

        <div className="flex flex-col gap-[3rem] text-[16px] xl:text-[18px]  xl:flex-row xl:justify-between  ">
          <ul className="flex flex-col gap-[1rem]">
            <li>
              <span className="font-[600]">native name: </span>

              <span className="text-dark-gray">
                {country.name?.official || "unknown"}
              </span>
            </li>

            <li>
              <span className="font-[600]">population: </span>

              <span className="text-dark-gray">
                {country?.population.toLocaleString() || "population unknown"}
              </span>
            </li>

            <li>
              <span className="font-[600]">region: </span>

              <span className="text-dark-gray">
                {country?.region || "no region recorded"}
              </span>
            </li>

            <li>
              <span className="font-[600]">sub region: </span>

              <span className="text-dark-gray">
                {country?.subregion || "no sub region"}
              </span>
            </li>

            <li>
              <span className="font-[600] ">capital: </span>

              <span className="text-dark-gray">
                {" "}
                {country?.capital || "no capital city"}{" "}
              </span>
            </li>
          </ul>

          <ul className="flex flex-col gap-[1rem]">
            <li>
              <span className="font-[600] ">top level domain: </span>

              <span className="text-dark-gray lowercase ">
                {" "}
                {country?.tld[0] || "no TLD"}{" "}
              </span>
            </li>

            <li>
              <span className="font-[600] "> currencies: </span>

              {Object.entries(country.currencies || {}).map(
                ([code, currency]) => (
                  <span key={code} className="text-dark-gray">
                    {currency.name}
                  </span>
                )
              )}
            </li>

            <li>
              <span className="font-[600]">Languages: </span>

              <span className="text-dark-gray">
                {Object.values(country.languages || {}).join(", ")}
              </span>
            </li>
          </ul>
        </div>

        <div className=" flex flex-col gap-[1rem] xl:flex-row xl:items-baseline ">
          <p className=" font-[800] text-[18px] xl:text-[20px] ">
            {" "}
            border countries:{" "}
          </p>

          <ul className=" grid grid-cols-3 grid-rows-auto items-center gap-[1rem] xl:gap-[1.5rem] ">
            {country?.borders.map((neighbour) => (
              <li
                key={neighbour}
                className={` flex justify-center ${
                  !active
                    ? "bg-dark-blue text-dark-gray hover:text-white "
                    : "bg-very-light-gray hover:text-dark-gray "
                } shadow-2xl ${
                  !active
                    ? "shadow-very-dark-blue-x hover:shadow-dark-gray "
                    : "shadow-dark-blue hover:shadow-very-dark-blue-x"
                } rounded-[0.2rem] py-[0.4rem] cursor-pointer  xl:min-w-[100px] transition duration-300 ease-in-out`}
                onClick={handleNeighbourCountryRouting}
              >
                {neighbour}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
