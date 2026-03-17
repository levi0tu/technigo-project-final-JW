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
        console.log(formData)
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
                    onChange={(handleChange) =>
                        setFormData({ ...formData, name: event.target.value })
                    } />
                <label htmlFor="email">E-post</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(handleChange) =>
                        setFormData({ ...formData, email: event.target.value })
                    } />
                <label htmlFor="password">Lösenord</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={(handleChange) =>
                        setFormData({ ...formData, password: event.target.value })
                    } />
                <button>Skapa konto</button>
            </form>

        </Layout>
    )
}