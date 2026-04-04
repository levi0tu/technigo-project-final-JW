const BASE_URL = import.meta.env.VITE_API_URL

export const getPaymentsByDebtId = async (debtId) => {
    try {
        const token = localStorage.getItem("token")

        const response = await fetch(`${BASE_URL}/payments/${debtId}`, {
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
        return { message: "Det gick inte att hämta betalningen just nu" }
    }
}

export const createPayment = async (formData) => {
    try {
        const token = localStorage.getItem("token")

        const response = await fetch(`${BASE_URL}/payments`, {
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
        return { message: "Det gick inte att registrera betalningen just nu" }
    }
}