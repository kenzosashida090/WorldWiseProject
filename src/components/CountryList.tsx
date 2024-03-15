import { useCity } from '../store/CityContext'
import styles from './CountryList.module.css'
import Message from './Message'
import { CityData } from '../store/CityContext'

import CountryItem from './CountryItem'

function CountryList() {
    
    const {cities} = useCity() || {cities:[], isLoading:false}
    if(cities.length === 0) return <Message message="Add your first country by clicking on a city on the map"/>
// CREATE AN ARRAY WITH UNIQUE ELEMENTS
    const countries = cities.reduce((arr,currentValue)=> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if(!arr.map((el :any)=>el.country).includes(currentValue.country)) 
            return [...arr, {country:currentValue.country, emoji:currentValue.emoji}]
        else return arr
        
    },[])
    
    return (
        <ul className={styles.countryList}>
            {countries.map((el:CityData)=> <CountryItem  country={el} />)}
        </ul>
    )
}
export default CountryList
