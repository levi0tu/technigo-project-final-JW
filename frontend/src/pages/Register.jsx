import { useState } from "react"
import { Layout } from "../components/Layout"

export const Register = () => {
    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
    })
    const handleSubmit = (event) => {
        event.preventDefault()
        alert("Konto skapat")

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
                    required />
                <label htmlFor="email">E-post</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Lösenord</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button>Skapa konto</button>
            </form>

        </Layout>
    )
}