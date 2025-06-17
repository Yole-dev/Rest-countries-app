import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// imported custom hook
import { CountryContext } from "../hooks/CountryNameContext";

export default function CountryDetail({ activeTheme }) {
  const [countryDetail, setCountryDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // getting the country name using context
  const { country, setCountry } = useContext(CountryContext);

  const query = country;

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

        console.log(data[0]);
      } catch (err) {
        setError(err.message);
        setCountryDetail([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchByQuery();
  }, [query]);

  return (
    <section className=" w-full h-svh flex flex-col px-[1.5rem] pb-[2rem] gap-[3rem]">
      <Link to="/">
        <button
          className={`flex gap-2 items-center justify-center font-[300] text-[16px] px-[2rem] py-[0.4rem] shadow-2xl focus:outline-none ${
            !activeTheme ? "bg-dark-blue" : "bg-custom-white"
          } `}
          onClick={() => {
            setCountry("");
            localStorage.removeItem("country");
          }}
        >
          <ion-icon name="arrow-back-outline"></ion-icon>
          <span>Back</span>
        </button>
      </Link>

      <DetailsContainer country={countryDetail} />
    </section>
  );
}

function DetailsContainer({ country }) {
  return (
    <section className=" w-full flex flex-col gap-[2rem] ">
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        className="w-full h-[250px] shadow-2xl"
      />

      <p className=" font-[800] text-[18px] "> {country.name.common} </p>
    </section>
  );
}
