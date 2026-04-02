const BASE_URL = "http://localhost:8080"


export const getDebts = async () => {
    try {
        const token = localStorage.getItem("token")

        const response = await fetch(`${BASE_URL}/debts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        //Om token är ogiltig eller saknas loggas användaren ut och skickas till login
        if (response.status === 401) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            window.location.href = "/login"
            return { message: "Din inloggning har gått ut. Logga in igen." }
        }

        const data = await response.json()
        return data
    } catch (error) {
        return { message: "Det gick inte att hämta skulder just nu." }
    }
}

export const getDebtById = async (id) => {
    try {
        const token = localStorage.getItem("token")

        const response = await fetch(`${BASE_URL}/debts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (response.status === 401) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            window.location.href = "/login"
            return { message: "Din inloggning har gått ut. Logga in igen." }
        }
        const data = await response.json()
        return data
    } catch (error) {
        return { message: "Det gick inte att hämta skulden just nu." }
    }
}

export const createDebt = async (formData) => {
    try {
        const token = localStorage.getItem("token")

        const response = await fetch(`${BASE_URL}/debts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        })

        if (response.status === 401) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            window.location.href = "/login"
            return { message: "Din inloggning har gått ut. Logga in igen." }
        }

        const data = await response.json()
        return data
    } catch (error) {
        return { message: "Det gick inte att spara skulden just nu." }
    }
}