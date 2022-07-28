import React, { useState} from 'react'
import { UilSearch, UilMapPin  } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';

function Inputs({setQuery, units, setUnits}) {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== '') setQuery({q: city})
  };

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
    };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info('Getting location')
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success('Got location')
        let lat= position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat, 
          lon,
        });
      });
    }
  };

  const handleEnterPress = (e) => {
    if (e.key=== 'Enter') {
      handleSearchClick();
    }
  }
  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            type="text" 
            placeholder='Where would you like to know the weather?'
            className='text-sm font-light p-2 w-full shadow-xl focus:outline-none 
            placeholder: capitalize' 
            onKeyDown={handleEnterPress}/>

            <UilSearch size={25} 
            className='text-white cursor-pointer transition ease-in-out hover:scale-125'
            onClick={handleSearchClick} />
            <UilMapPin size={25} 
            className='text-white cursor-pointer transition ease-in-out hover:scale-125' 
            onClick={handleLocationClick}/>
        </div>

        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button name='imperial'
            className='text xl text-white font-light transition ease-out hover:scale-125'
            onClick={handleUnitsChange}
            >°F</button>
            <p className='text-xl text-white mx-1'>|</p>
            <button name='metric'
            className='text xl text-white font-light transition ease-out hover:scale-125'
            onClick={handleUnitsChange}
            >°C</button>
        </div>
    </div>
  )
}

export default Inputs;