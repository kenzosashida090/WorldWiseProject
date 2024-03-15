import { useCity } from '../store/CityContext'
import CityItem from './CityItem'
import styles from './CityList.module.css'
import { CityData } from '../store/CityContext'
import Message from './Message'
function CityList() {

    const {cities} = useCity() || {cities:[], isLoading:false}
    if(cities.length === 0) return <Message message="Add your first country by clicking on a city on the map"/>
    return (
        <ul className={styles.cityList}>
            {cities.map((el:CityData)=> <CityItem key={el.id}  city={el} />)}
        </ul>
    )
}


export  default CityList
