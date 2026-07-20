import { useEffect, useState } from "react";
import axios from "axios";
function isEmpty(str) {
  return !str || str.length === 0;
}

const Country = ({ country }) => {
  return <p>{country.name.common}</p>;
};

const CountryContent = ({ country }) => {
  console.log(country.languages);
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h1>Languages</h1>
      <ul>
        {Object.entries(country.languages).map(([key, language]) => (
          <p key={key}>{language}</p>
        ))}
      </ul>

      <img src={country.flags.png} />
    </>
  );
};
const Countries = ({ countries, search }) => {
  if (isEmpty(search)) {
    return null;
  }
  const countriesToShow = countries?.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  if (countriesToShow.length == 1) {
    return (
      <>
        <CountryContent country={countriesToShow[0]} />
      </>
    );
  }

  return (
    <>
      {countriesToShow?.map((country, index) => (
        <Country key={index} country={country} />
      ))}
    </>
  );
};

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(null);
  const handleChange = (value) => {
    setSearch(value.target.value);
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <>
      <form>
        <div>
          country name: <input value={search} onChange={handleChange} />
        </div>
      </form>

      <Countries countries={countries} search={search} />
    </>
  );
}

export default App;
