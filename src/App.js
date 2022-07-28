import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

function App() {

  const [query, setQuery] = useState({q: 'Berlin'})
  const [units, setUnits] = useState('imperial')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
    const message = query.q ? query.q: 'current location.'

    toast.info('Getting weather for ' + message);

      await getFormattedWeatherData({...query, units}).then(
      (data) => {
      toast.success(`Loaded weather for ${data.name}, ${data.country}`)

        setWeather(data);
      });
    };
  
    fetchWeather();

  }, [query, units]);

  return (
  <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 
  h-fit shadow-xl shadow-gray-400
  bg-unsplash-background">
    <TopButtons setQuery={setQuery} />
    <Inputs setQuery={setQuery} units={units} setUnits={setUnits} /> 
    {weather && (
      <div>
          <TimeAndLocation weather={weather}/>
          <TemperatureAndDetails weather={weather} />
          <Forecast title='Hourly forecast' items={weather.hourly} />
          <Forecast title='Daily forecast' items={weather.daily} />
        </div>
    )}

  <ToastContainer autoClose={5000} theme='colored' newestOnTop={true}/>

  </div>


  );
}

export default App;
