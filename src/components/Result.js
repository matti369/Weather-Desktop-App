import React from 'react';
import "./Result.css"

const Result = props => {

    const {date, city, sunrise, sunset, temp, pressure, wind, err} = props.weather

    let content_ok = null
    let content_err = null

    if(!err && city) {
        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString()
        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString()
        content_ok = (
            <div className= "result">
                <h2>Wyniki wyszukiwania dla:</h2>
                <h2 className="cityName">{city.toUpperCase()}</h2>
                <h3>{date}</h3>
                <h3>Temperatura: {temp} &#176;C</h3>
                <h3>Wschód słońca dzisiaj o {sunriseTime}</h3>
                <h3>Zachód słońca dzisiaj o {sunsetTime}</h3>
                <h3>Siła wiatru {wind} m/s</h3>
                <h3>Ciśnienie atmosferyczne {pressure} hPa</h3>
            </div>
        )
    } else {
        content_err = (
            <div className="wrongCityName">
                {`Nie mamy w bazie ${city}...`}
            </div>
        )
    }

    return ( 
        <>
        {err ? content_err : content_ok}
        </>
     );
}
 
export default Result;