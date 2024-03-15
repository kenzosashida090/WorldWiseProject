import { Outlet } from "react-router-dom"
import AppNav from "./AppNav"
import Footer from "./Footer"
import Logo from "./Logo"
import styles from "./Sidebar.module.css"
function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            {/*OUTLET IS SET AS A FUNCTION CHILDREN, PUT THE ACTUAL CONTENT FROM 
            THE NESTED ROUTE ELEMENT ATTRIBUTE
             INTO THIS COMPIONENT CALLED OUTLET  */}
            <Outlet/>

            <Footer/>
        </div>
    )
}

export default Sidebar
