import './App.css';
import Search from './components/search/Search';
import CurrentWeather from './current-weather/Current-Weather';
import { WEATHER_API_URL, WEATHER_API_KEY} from './Api';
import { useState } from 'react';
import Forecast from './components/Forecast/Forecast';

function App() {
  const [ currentWeather, setCurrentWeather] = useState(null);
  const [ forecast, setForecast] = useState(null);


  // search data gives a label and a value cuz we made it return that and 
  // it holds lat + longitude and location
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] =searchData.value.split(" ");
    // we're going to fecth the 2 api calls
    // 1st one is current weather and 2nd one is for the forecast

    // change to celsius 
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json()
        const forecastResponse = await response[1].json()

        setCurrentWeather({city: searchData.label,  ...weatherResponse});
        setForecast({city: searchData.label, ...forecastResponse});

      })
  }

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
        {currentWeather && <CurrentWeather data={currentWeather}/>}
        {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
