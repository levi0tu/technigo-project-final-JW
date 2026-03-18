import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { AuthContext } from "../context/AuthContext"
import { loginUser } from "../services/auth"


export const Login = () => {
    const { setIsLoggedIn, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("")

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMessage("")

        const data = await loginUser(formData)
        setErrorMessage(data.message)

        if (data.user) {
            setIsLoggedIn(true)
            setUser(data.user)
            navigate("/dashboard")
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
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
                    onChange={handleChange}
                    required
                    autoComplete="email"
                />
                <label htmlFor="password">Lösenord</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                />
                <button>Logga in</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </Layout>
    )
}