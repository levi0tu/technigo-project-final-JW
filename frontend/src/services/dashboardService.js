const BASE_URL = "http://localhost:8080"



export const getDashboardData = async () => {
    const token = localStorage.getItem("token")

    const response = await fetch(`${BASE_URL}/dashboard`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const data = await response.json()
    return data
}