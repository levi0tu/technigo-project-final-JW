import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { AuthContext } from "../context/AuthContext"
import { loginUser } from "../services/auth"


export const Login = () => {
    const { setIsLoggedIn, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMessage("")

        if (!formData.email.trim()) {
            setErrorMessage("E-post måste fyllas i.")
            return
        }

        if (!formData.password) {
            setErrorMessage("Lösenord måste fyllas i.")
            return
        }
        setIsLoading(true)

        const data = await loginUser({
            ...formData,
            email: formData.email.trim(),
        })

        setIsLoading(false)
        setErrorMessage(data.message)

        if (data.user) {
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            setIsLoggedIn(true)
            setUser(data.user)
            navigate("/dashboard")
            return
        }

        if (data.message === "Fel lösenord" || data.message === "Användaren finns inte") {
            setErrorMessage(data.message || "E-post eller lösenord är fel.")
        } else {
            setErrorMessage(data.message || "Det gick inte att logga in just nu. Försök igen om en stund.")
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
            <section className="auth-page">
                <div className="auth-panel">
                    <section className="page-hero">
                        <h2 className="page-title">Logga in</h2>
                        <p className="page-description">
                            Växla upp din koll på pengarna.</p>
                    </section>

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
                        <button className="button button-primary" disabled={isLoading}>
                            {isLoading ? "Loggar in..." : "Logga in"}
                        </button>
                    </form>
                    {errorMessage && <p className="auth-error">{errorMessage}</p>}
                    <div className="auth-link">
                        <Link to="/register">Har du inget konto än?
                            Klicka här för att skapa ett.</Link>
                    </div>
                </div>
            </section>
        </Layout>
    )
}