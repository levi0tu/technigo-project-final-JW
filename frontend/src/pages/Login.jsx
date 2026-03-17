import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { AuthContext } from "../context/AuthContext"


export const Login = () => {
    const { setIsLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoggedIn(true)
        navigate("/dashboard")
    }

    return (
        <Layout>
            <h2>Logga in</h2>
            <p>Växla upp din koll på pengarna.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-post</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                        setFormData({ ...formData, email: event.target.value })}
                    required />
                <label htmlFor="password">Lösenord</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={(event) =>
                        setFormData({ ...formData, password: event.target.value })}
                    required />
                <button>Logga in</button>
            </form>
        </Layout>
    )
}