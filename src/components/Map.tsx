import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useCity } from '../store/CityContext'
import { CityData, CityContextType } from '../store/CityContext'
function Map() {
    const [searchParams, ] = useSearchParams()
    const navigate = useNavigate()// Programmatic Navigation
    const {cities} = useCity()
    
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const position= [51.505, -0.09]
    return (
        <div className={styles.mapContainer} onClick={()=>navigate("form")}>
         <MapContainer center={position} zoom={13} className={styles.map} scrollWheelZoom={true}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {
            cities.map((el:CityData)=> 
                <Marker key={el.id} position={[el.position["lat"], el.position["lng"]]}>
                <Popup>
                    <span>{el.emoji}</span>
                    <span>{el.cityName}</span>
                </Popup>
                </Marker>)
            }
         </MapContainer>
        </div>
    )
}

export default Map
