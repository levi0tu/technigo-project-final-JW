import { useState } from "react"
import { Layout } from "../components/Layout"
import { registerUser } from "../services/auth"

export const Register = () => {
    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
    })
    const [message, setMessage] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        setMessage("")
        const data = await registerUser(formData)

        setMessage(data.message)
        setFormData({
            name: "",
            email: "",
            password: "",
        })

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
            <h2>Skapa konto</h2>
            <p>Ett klick till, sen har du full överblick</p>
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
                <button>Skapa konto</button>
            </form>
            {message && <p>{message}</p>}
        </Layout>
    )
}