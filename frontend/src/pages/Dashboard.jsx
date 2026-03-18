import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { AuthContext } from "../context/AuthContext"

export const Dashboard = () => {
    const { user, setIsLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        setIsLoggedIn(false)
        navigate("/login")
    }

    return (
        <Layout>
            <h2>Översikt</h2>
            <p>Här ser du snabbt hur läget ser ut just nu.</p>
            <p>Välkommen {user?.name}</p>
            <p>Du har 2 aktiva skulder just nu</p>
            <button onClick={handleLogout}>Logga ut</button>
        </Layout>
    )
}