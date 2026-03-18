const BASE_URL = "http://localhost:8080"

export const getDashboardData = async () => {
    const response = await fetch(`${BASE_URL}/dashboard`)
    const data = await response.json()
    return data
}