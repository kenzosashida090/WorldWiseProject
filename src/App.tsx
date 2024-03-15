import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/Homepage"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import {CityProvider} from "./store/CityContext"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"



function App () {
  
  //Navigate its a component that we use to redirect  users. It takes two parameters: the path they will be redirected 
  return(

    <>
  <CityProvider>
    <BrowserRouter>
    <Routes>
      <Route  path="/" element={<HomePage/>}/>
      <Route path="product" element={<Product/>} />
      <Route path="pricing" element={<Pricing/>} />
      <Route path="app" element={<AppLayout/>} > 
        {/* ROUTE INDEX ITS DE DEFAULT ANESTED ROUTE */}
        <Route  index element={<Navigate replace to="cities" />}/>
        <Route path="cities" element={<CityList/>}/>
        {/* CREATE DYNAMIC ROUTES 1) CREATE THE ROUTE */}
        <Route path="cities/:id" element={<City/>}/>
        <Route path="countries" element={<CountryList/>}/>
        <Route path="form" element={<Form/>} />
      </Route>
      <Route path="*" element={<PageNotFound/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
    </BrowserRouter>
  </CityProvider>
  </>
    ) 
}

export default App