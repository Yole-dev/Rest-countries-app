import { useState, useEffect } from "react";

export default function CountryDetail({ activeTheme, country, setCountry }) {
  const [countryDetail, setCountryDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = country;

  useEffect(() => {
    async function fetchByQuery() {
      setIsLoading(true);
      try {
        setError(null);

        const res = await fetch(`https://restcountries.com/v3.1/name/${query}`);
        if (!res.ok) throw new Error("Country doesn't exist.");

        const data = await res.json();
        setCountryDetail(data);
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
    <section className=" w-full h-svh flex flex-col items-center "></section>
  );
}
