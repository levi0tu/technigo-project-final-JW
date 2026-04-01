const BASE_URL = "http://localhost:8080"

export const getPaymentsByDebtId = async (debtId) => {
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
        return
    }
    const data = await response.json()
    return data
}

export const createPayment = async (formData) => {
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
        return
    }
    const data = await response.json()
    return data
}
