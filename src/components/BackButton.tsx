import { useNavigate } from "react-router-dom"
import Button from "./Button"

function BackButton() {
    const navigate = useNavigate()
    return (
        
             <Button onClick={()=>navigate(-1)} type="back">&larr; Back</Button>
        
    )
}

export default BackButton
