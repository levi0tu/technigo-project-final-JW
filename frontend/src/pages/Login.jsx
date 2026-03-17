import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { AuthContext } from "../context/AuthContext"


export const Login = () => {
    const { setIsLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = () => {
        setIsLoggedIn(true)
        navigate("/dashboard")
    }

    return (
        <Layout>
            <h2>Logga in</h2>
            <p>Växla upp din koll på pengarna.</p>
            <button onClick={handleLogin}>Logga in</button>
        </Layout>
    )
}