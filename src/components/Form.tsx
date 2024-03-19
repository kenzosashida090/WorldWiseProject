// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import styles from "./Form.module.css";
import Button from "./Button";
import "react-datepicker/dist/react-datepicker.css";
import BackButton from "./BackButton";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCity } from "../contexts/CityContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate()
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat,lng] = useUrlPosition()
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [errorGeocoding, setErrorGeocoding] = useState("")
  const [emoji,setEmoji] = useState("")
  const {createCity, isLoading } = useCity()
  useEffect(()=>{
    if (!lat && !lng) return
    async function fetchDataCity() {
      try{
        setIsLoadingGeocoding(true)
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        const data = await res.json();
        console.log(data)
        if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else...")
        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setEmoji(()=>convertToEmoji(data.countryCode))
        setErrorGeocoding("")
      }catch(err){
          setErrorGeocoding(err.message)
      } finally{
          setIsLoadingGeocoding(false)
        
      }

    }
    fetchDataCity()
  },[lat,lng])
  if(isLoadingGeocoding) return <Spinner/>
  if (errorGeocoding){ 
   
    return <Message message={errorGeocoding} />
  
  }
  async  function handleSubmit (e) {
    e.preventDefault()
    if(!cityName || !date) return
    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position:{lat,lng}
    }
    await createCity(newCity)
    navigate("/app/cities")
  }
  if(!lat && !lng) return <Message message={"Start by clicking somwhere in the map..."} />
  return (
    <form className={`${styles.form} ${isLoading ? "loading" : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        
        <DatePicker id="date" onChange={(date)=>setDate(date)} selected={date}/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        
        <Button type="primary">Add</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
