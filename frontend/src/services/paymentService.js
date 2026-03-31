const BASE_URL = "http://localhost:8080"

export const getPaymentsByDebtId = async (debtId) => {
    const token = localStorage.getItem("token")

    const response = await fetch(`${BASE_URL}/payments/${debtId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

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

    const data = await response.json()
    return data
}
