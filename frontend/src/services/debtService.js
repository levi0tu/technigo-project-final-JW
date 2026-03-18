const BASE_URL = "http://localhost:8080"

export const getDebts = async () => {
    const response = await fetch(`${BASE_URL}/debts`)
    const data = await response.json()
    return data
}


export const getDebtById = async (id) => {
    const response = await fetch(`${BASE_URL}/debts/${id}`)
    const data = await response.json()
    return data
}