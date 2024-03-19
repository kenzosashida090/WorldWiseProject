import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCity } from "../contexts/CityContext";
import { useEffect } from "react";
import Button from "./Button";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date:string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // TEMP DATA


  const {id} = useParams()
  const {currentCity, getCity, isLoading} = useCity()
  const {emoji,cityName, date,notes} = currentCity
 
  useEffect(()=>{
    getCity(id)
  },[id,getCity])


  //THE FIRST RULE OF HOOKS WE NEED TO CREATE ALL OF THEM
  //IF WE WANT TO RETURN SOMETHING WE SET THIS AT THE END OF ALL HOOKS CREATED
  if (isLoading) return <Spinner/>
  return (
    <div className={styles.city}>
      {isLoading && <Spinner/>}
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
       <BackButton/>
      </div>
    </div>
  );
}

export default City;
