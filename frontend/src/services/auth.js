const BASE_URL = import.meta.env.VITE_API_URL

export const loginUser = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })

        const data = await response.json()
        return data
    } catch (error) {
        return { message: "Det gick inte att logga in just nu." }
    }
}
export const registerUser = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })

        const data = await response.json()
        return data
    } catch (error) {
        return { message: "Det gick inte att skapa konto just nu." }
    }
}

export const getMe = async () => {
    try {
        const token = localStorage.getItem("token")

        const response = await fetch(`${BASE_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (response.status === 401) {
            return { unauthorized: true, message: "Din inloggning har gått ut. Logga in igen." }
        }
        const data = await response.json()
        return data
    } catch (error) {
        return { message: "Det gick inte att hämta användaren just nu." }
    }
}