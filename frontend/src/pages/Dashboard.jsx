import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { AuthContext } from "../context/AuthContext"

export const Dashboard = () => {
    const { setIsLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        setIsLoggedIn(false)
        navigate("/login")
    }

    return (
        <Layout>
            <h2>Översikt</h2>
            <button onClick={handleLogout}>Logga ut</button>
        </Layout>
    )
}