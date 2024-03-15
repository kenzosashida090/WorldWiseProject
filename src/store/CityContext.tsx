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
  id: number
}
export type  CityContextType = {
  cities : CityData[],
  isLoading: boolean,
  currentCity:CityData,
  getCity: (id:number)=>void ,
}
const CityContext = createContext<CityContextType | null>(null) 
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
    async function getCity (id:number){
      try{
        setLoading(true)
        const res = await fetch(`${BASE_URL}/${id}`)
        const data = await res.json()
        setCurrentCity(data)
      }catch (err){
        console.log(err);
      }finally{
        setLoading(false)
      }
    }
    return (
       <CityContext.Provider value={{
        cities ,
        isLoading,
        currentCity,
        getCity
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