import { useState } from "react"
import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"
import { registerUser } from "../services/auth"

export const Register = () => {
    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
    })
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setMessage("")
        setIsLoading(true)
        const data = await registerUser(formData)
        setIsLoading(false)

        setMessage(data.message)
        if (data.user) {
            setFormData({
                name: "",
                email: "",
                password: "",
            })
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
            <section className="page-hero">
                <h2 className="page-title">Skapa konto</h2>
                <p className="page-description">
                    Skapa ett konto för att få full överblick över dina skulder</p>
            </section>

            <section className="base-card">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Namn</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                    />
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
                        autoComplete="new-password"
                    />
                    <button disabled={isLoading}>
                        {isLoading ? "Skapar konto..." : "Skapa konto"}
                    </button>
                </form>
            </section>
            {message && <p>{message}</p>}
            <div className="auth-link">
                <Link to="/login">Har du redan ett konto? Klicka här för att logga in.</Link>
            </div>
        </Layout>
    )
}