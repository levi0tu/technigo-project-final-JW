import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const Dashboard = () => {
    const { setIsLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        setIsLoggedIn(false)
        navigate("/login")
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}