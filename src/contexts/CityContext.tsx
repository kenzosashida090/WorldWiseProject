/* eslint-disable react-refresh/only-export-components */


// 1) Create a context

import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000/cities"

type Props = {
  children: string | JSX.Element | JSX.Element[] 
}
export interface CityData {
  cityName: string,
  country: string,
  emoji: string,
  date: string,
  notes: string,
  position: {
    lat: number,
    lng: number
  },
  id: string
}
export type  CityContextType = {
  cities : CityData[],
  isLoading: boolean,
  currentCity:CityData,
  getCity: (id:string)=>void ,
  createCity: (newCity:CityData)=>void,
  deleteCity: (id:string)=>void,
}
const CityContext = createContext<CityContextType>({
  cities : [],
  isLoading: false,
  currentCity:{
    cityName: "",
    country: "",
    emoji: "",
    date: "",
    notes: "",
    position: {
      lat: 0,
      lng: 0
    },
    id: "string"
  },
  getCity: ()=>null ,
  createCity: ()=>null ,
  deleteCity: ()=>null ,
}) 
function CityProvider ({children}:Props) {
    const [cities, setCities] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState<CityData>({})
    useEffect(()=> {
    
        async function fetchData() {
          try{
            setLoading(true)
            const res = await  fetch(`${BASE_URL}`)
            const data = await res.json()
            setCities(data)
          }catch (err) {
            console.log("Error", err)
          }finally{
            setLoading(false)
          }
  
        }
        fetchData()
      
    },[])
    async function getCity (id:string){
      try{
        setLoading(true)
        const res = await fetch(`${BASE_URL}/${id}`)
        const data = await res.json()
        
        setCurrentCity(data)
      }catch (err){
        console.log("error",err);
      }finally{
        setLoading(false)
      }
    }

    async function createCity(newCity:CityData) {
      try{
        const res = await fetch(`${BASE_URL}`,{
          method:"POST",
          body:JSON.stringify(newCity),
          headers:{
            "Content-Type":"application/json"
          }
        })
        const data = await res.json()
        setCities((prevCities) => [...prevCities, data])
      }catch(err){
        alert('Failed to add city')
      }finally{
        setLoading(false)
      }
    }
    async function deleteCity(id:string) {
      try{
        setLoading(true)
        await fetch(`${BASE_URL}/${id}`,{
          method:"DELETE"
        })
     
        setCities((cities)=> cities.filter((citie:CityData) => id != citie.id))
      }catch(err){
        alert('Failed to delete city');
      }finally{
        setLoading(false)
      }
      
    }
    return (
       <CityContext.Provider value={{
        cities ,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity
    }}>
    {children}
    </CityContext.Provider>

    )
}

function useCity (): CityContextType | null{
  const context = useContext(CityContext)
  if(context === undefined) throw new Error("useCity must be used within the CityProvider")
  return context
}


export { CityProvider, useCity} 