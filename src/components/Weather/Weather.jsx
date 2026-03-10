import { useState } from "react"

import styles from "./Weather.module.css"

const API_KEY = '748e23fbfc870f3a8c4048996844506d'

export default function Weather() {
    const [city,setCity] = useState('');
    const [showDetails,setShowDetails] = useState(false);
    const [fetchData,setFetchData] = useState(null);
    const onClickSearch = async ()=> {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        setFetchData(data);
        setCity('')
        console.log(data);
    }
    return (
       <div className={`${styles.container} ${styles[fetchData?.weather?.[0]?.main?.toLowerCase()]}`}>
        <div className={styles.cont} >
            <div className={styles.enterInf} style={{opacity: city? 0 : 1}}>Enter the city</div>
            <br/>
            <form className={styles.inputdiv}>
                <input className={styles.input} type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="e.g. Tokyo"></input>
                <button disabled={!city} type="submit" onClick={(e)=>{
                    e.preventDefault()
                    onClickSearch()
                }} className={styles.loupe}>
                    <svg className={styles.svg}  width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="blue" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                         <circle cx="11" cy="11" r="8"></circle>
                         <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </form>
            <br></br>
            {(fetchData && fetchData.name!==undefined) ? (
            <label>
                <input type="checkbox" checked={showDetails} onChange={(e)=>setShowDetails(e.target.checked)}/>
                 Show details
            </label>) : null}
        </div>
        {(fetchData && fetchData.name!==undefined) ? (
        <div className={styles.infoContainer}>
            <section className={styles.info}>
            <div>
            <h1>{fetchData.name} {'('}{fetchData.sys.country}{')'}</h1>
            <h2>Temperature : {Math.round(fetchData.main?.temp)} °C</h2>
            <h2>{fetchData.weather?.[0].main}</h2>
            </div>
            </section>
            
            {showDetails ? (
                <div className={styles.moreInfo}>
                <h2>Wind speed : {fetchData.wind?.speed} m/s</h2>
                <h2>Humidity : {fetchData.main?.humidity} %</h2>
                <h2>Pressure : {(fetchData.main?.pressure/1.33322).toFixed(2)} mmHg</h2>
                </div>
            ) : null}
        </div> ) : null }
        
        
       </div> 
    )
}