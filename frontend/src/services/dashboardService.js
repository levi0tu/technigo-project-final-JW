const BASE_URL = "http://localhost:8080"

export const getDashboardData = async (userId) => {
    const response = await fetch(`${BASE_URL}/dashboard?userId=${userId}`)
    const data = await response.json()
    return data
}