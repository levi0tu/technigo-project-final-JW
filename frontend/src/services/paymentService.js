const BASE_URL = "http://localhost:8080"

export const getPaymentsByDebtId = async (debtId) => {
    const response = await fetch(`${BASE_URL}/payments/${debtId}`)
    const data = await response.json()
    return data
}
