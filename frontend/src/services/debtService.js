const BASE_URL = "http://localhost:8080"


export const getDebts = async () => {
    const token = localStorage.getItem("token")

    const response = await fetch(`${BASE_URL}/debts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()
    return data
}

export const getDebtById = async (id) => {
    const token = localStorage.getItem("token")

    const response = await fetch(`${BASE_URL}/debts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()
    return data
}

export const createDebt = async (formData) => {
    const token = localStorage.getItem("token")

    const response = await fetch(`${BASE_URL}/debts`, {
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