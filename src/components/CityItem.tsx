import styles from './CityItem.module.css'
import { CityData, useCity} from '../contexts/CityContext'
import { Link } from 'react-router-dom';
interface CityItemProps {
    city: CityData,
}

function CityItem({city}: CityItemProps ) {
  const {currentCity,deleteCity} = useCity()
  const {cityName, emoji, date,position,id} = city
    const formatDate = (date:string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
    function handleDelete (e) {
      e.preventDefault()
      deleteCity(id)
    }
    return (
        <li >
          <Link className={`${styles.cityItem} ${currentCity.id === city.id? styles["cityItem--active"] : ""}`} to={`${city.id}?lat=${position.lat}&lng=${position.lng}`}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button onClick={handleDelete} className={styles.deleteBtn}>&times;</button>
          </Link>
            
        </li>
    )
}

export default CityItem
