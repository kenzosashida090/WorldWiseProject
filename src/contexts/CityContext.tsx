/* eslint-disable react-refresh/only-export-components */


// 1) Create a context

import { createContext, useCallback, useContext, useEffect, useReducer,  } from "react";

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
type TypeInitialState ={
  cities:[]
  isLoading:boolean,
  currentCity:CityData,
  error:string
}

type TypeAction ={
  type:"loading" | "cities/loaded" | "city/loaded"| "city/created" | "city/deleted" | "error" ,
  payload?:CityData []|CityData | ""
  
}
const initialState:TypeInitialState = {
  cities:[],
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
  id: ""},
  error:""
}
function reducer (state:TypeInitialState,action:TypeAction) {
  switch(action.type){
    case "loading":
      return{...state, isLoading:true}

    case "cities/loaded":
      return{...state, isLoading:false, cities:action.payload}

    case "city/loaded":
      return{...state,isLoading:false, currentCity: action.payload  }

    case "city/created":
      return{...state,isLoading:false, cities:[...state.cities,  action.payload], currentCity: action.payload}
    case "city/deleted":
      return{...state,isLoading:false, cities:[state.cities.filter((city:CityData)=>city.id !== action.payload)]}  
    case "error":
      return{...state,isLoading:false, error:action.payload }
    }
}
function CityProvider ({children}:Props) {
  
    // const [cities, setCities] = useState([])
    // const [isLoading, setLoading] = useState(false)
    // const [currentCity, setCurrentCity] = useState<CityData>({})
    const [{cities,isLoading,currentCity}, dispatch]=useReducer(reducer,initialState)

    useEffect(()=> {
    
        async function fetchData() {
          dispatch({type:"loading"})
          try{
            const res = await  fetch(`${BASE_URL}`)
            const data = await res.json()
            dispatch({type:"cities/loaded", payload:data })
          }catch (err) {
           dispatch({type:"error", payload: err.message})
          }
  
        }
        fetchData()
      
    },[])
  const getCity = useCallback(  async function getCity (id:string){
      if(id === currentCity.id) return
      dispatch({type:"loading"})
      try{

        const res = await fetch(`${BASE_URL}/${id}`)
        const data = await res.json()
        
        dispatch({type:"city/loaded", payload:data })
      }catch (err){
        dispatch({type:"error", payload: err.message})
      }
    },[currentCity.id])

    async function createCity(newCity:CityData) {
      dispatch({type:"loading"})
      try{
        const res = await fetch(`${BASE_URL}`,{
          method:"POST",
          body:JSON.stringify(newCity),
          headers:{
            "Content-Type":"application/json"
          }
        })
        const data = await res.json()
        dispatch({type:"city/created",payload:data})
      }catch(err){
        dispatch({type:"error", payload: err.message})
      }
    }
    async function deleteCity(id:string) {
      dispatch({type:"loading"})
      try{
        
        await fetch(`${BASE_URL}/${id}`,{
          method:"DELETE"
        })
     
        dispatch({type:"city/deleted",payload:id})
      }catch(err){
        dispatch({type:"error", payload: err.message})
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