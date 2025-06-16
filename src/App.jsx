import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Layout from "./components/Layout";
import Home from "./assets/pages/Home";
import CountryDetail from "./assets/pages/Details";

export default function App() {
  const [activeTheme, setActiveTheme] = useState(false);
  const [country, setCountry] = useState("");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout activeTheme={activeTheme} setActiveTheme={setActiveTheme}>
              <Home activeTheme={activeTheme} setCountry={setCountry} />
            </Layout>
          }
        />

        <Route
          path="/country-detail"
          element={
            <Layout activeTheme={activeTheme} setActiveTheme={setActiveTheme}>
              <CountryDetail
                activeTheme={activeTheme}
                country={country}
                setCountry={setCountry}
              />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}
