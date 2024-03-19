import { useNavigate } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Marker, Popup, useMap,  useMapEvents } from 'react-leaflet'
import { useCity } from '../contexts/CityContext'
import { CityData} from '../contexts/CityContext'
import { useEffect, useState } from 'react'
import useGeolocation from '../hooks/useGeolocation'
import Button from './Button'
import useUrlPosition from '../hooks/useUrlPosition'
function Map() {
    const [mapPosition, setMapPosition] = useState<string[] | number[]>(["40","0"])
    const {isLoading: isLoadingPosition, position:geolocationPosition, getPosition} = useGeolocation()
    const {cities} = useCity()
    const [mapLat,mapLng]=useUrlPosition()
    const position= [51.505, -0.09]

    useEffect(()=>{
        if(mapLat && mapLng) setMapPosition([mapLat,mapLng])
    },[mapLat,mapLng])

    useEffect(()=>{
       if(geolocationPosition){
        setMapPosition([geolocationPosition.lat,geolocationPosition.lng])
       } 
    },[geolocationPosition])
    return (
        <div className={styles.mapContainer} >
            <Button type="position" onClick={getPosition}>{isLoadingPosition? 'Loading...':"Use your position"}</Button>
         <MapContainer center={position} zoom={6} className={styles.map} scrollWheelZoom={true}>
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
            <CenterMap position={mapPosition} />
            <DetectClick/>
         </MapContainer>
        </div>
    )
}
function CenterMap({position}) {
    const map = useMap()
    map.setView(position)
    return null
}

function DetectClick() {
    const navigate = useNavigate()// Programmatic Navigation

    useMapEvents(
        {
            click:(e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    )
        return null
}

export default Map
