const BASE_URL = "http://localhost:8080"

export const getDebts = async (userId) => {
    const response = await fetch(`${BASE_URL}/debts?userId=${userId}`)
    const data = await response.json()
    return data
}

export const getDebtById = async (id) => {
    const response = await fetch(`${BASE_URL}/debts/${id}`)
    const data = await response.json()
    return data
}

export const createDebt = async (formData) => {
    const response = await fetch(`${BASE_URL}/debts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })

    const data = await response.json()
    return data
}