const BASE_URL = "http://localhost:8080"

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
    const token = localStorage.getItem("token")

    const response = await fetch(`${BASE_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (response.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.href = "/login"
        return
    }
    const data = await response.json()
    return data
}