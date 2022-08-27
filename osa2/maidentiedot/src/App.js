import React, { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [filtre, setFiltre] = useState("")
  const [countryToShow, setCountryToShow] = useState("")
  const api_key = '2a236095dca56955e349b38b2c760150'

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
    })
  }, [])

  const handleFilterChange = (event) => {
    setFiltre(event.target.value);
    setShowAll(false);
  }

  const handleCountryToShow = (alpha3Code) => {
    setCountryToShow(alpha3Code);
  }

  const countriesToShow = showAll
    ? countries
    : countries.filter(
        (country) =>
          country.name.toLowerCase().includes(filtre.toLowerCase()) === true
      )

  return (
    <div>
      <div>
        find <input value={filtre} onChange={handleFilterChange} />
      </div>
      <CountryList
        countriesToShow={countriesToShow}
        countryToShow={countryToShow}
        handleCountryToShow={handleCountryToShow}
        api_key={api_key}
      />
    </div>
  )
}

const CountryList = ({
  countriesToShow,
  countryToShow,
  handleCountryToShow,
  api_key,
}) => {
  const rowsToShow = countriesToShow;

  let country;
  if (countryToShow || rowsToShow.length === 1) {
    if (rowsToShow.length === 1) {
      country = rowsToShow[0]
    } else {
      country = rowsToShow.find(
        (country) => country.alpha3Code === countryToShow
      )
    }
    return (
      <Country
        key={country.alpha3Code}
        country={country}
        showAll={true}
        handleCountryToShow={handleCountryToShow}
        api_key={api_key}
      />
    )
  }

  if (rowsToShow.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  const rows = rowsToShow.map((country) => (
    <Country
      key={country.alpha3Code}
      country={country}
      showAll={false}
      handleCountryToShow={handleCountryToShow}
      api_key={api_key}
    />
  ))

  return (
    <div>
      <ul>{rows}</ul>
    </div>
  )
}

const Country = ({ country, showAll, handleCountryToShow, api_key }) => {
  if (showAll) {
    const flagUrl = country.flag;
    return (
      <div>
        <div>
          <h1>{country.name}</h1>
        </div>
        <div>
          capital = {country.capital}
          <br />
          area = {country.population}
        </div>
        <div>
          <h2>languages</h2>
        </div>
        <div>
          <ul>
            {country.languages.map((lang) => (
              <Language key={lang.name} language={lang.name} />
            ))}
          </ul>
        </div>
        <div>
          <img src={flagUrl} width={200} alt="flag"/>
        </div>
        <div>
          <h3>weather in {country.capital}</h3>
          <Weather
            key={country.capital}
            capital={country.capital}
            api_key={api_key}
          />
        </div>
      </div>
    )
  }
  return (
    <div>
      <ul>
        {country.name}
        <button
          name={country.alpha3Code}
          onClick={() => handleCountryToShow(country.alpha3Code)}>
          show
        </button>
      </ul>
    </div>
  )
}

const Language = ({ language }) => {
  return <div><li>{language}</li></div>
}

const Weather = ({ capital, api_key }) => {
  const [weather, setWeather] = useState({})

  const handleWeatherChange = (temperature, icon, wind, direction) => {
    setWeather({
      temperature: temperature,
      icon: icon,
      wind: wind,
      direction: direction,
    })
  }
  axios
    .get(
      `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
    )
    .then((response) => {
      console.log(response.data)
      const res = response.data;
      const temperature = res.current.temperature;
      const wind = res.current.wind_speed;
      const icon = res.current.weather_icons;
      const direction = res.current.wind_dir;
      handleWeatherChange(temperature, icon, wind, direction);
    })
    .catch((error) => {
      console.log(error)
    })
  return (
    <div>
      <div>temperature: {weather.temperature} Celsius</div>
      <div>
        <img src={weather.icon} alt=""></img>
      </div>
      <div>wind: {weather.wind} mph direction {weather.direction}</div>
    </div>
  )
}

export default App