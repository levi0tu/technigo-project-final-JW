const BASE_URL = import.meta.env.VITE_API_URL


// Fetch dashboard-data for the logged in user
//The token is sent in the Authorization header so backend can identify the user.
export const getDashboardData = async () => {
    try {
        const token = localStorage.getItem("token")

        const response = await fetch(`${BASE_URL}/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        //If the token is invalid or missing, send the user a message
        if (response.status === 401) {
            return { unauthorized: true, message: "Din inloggning har gått ut. Logga in igen." }
        }

        const data = await response.json()
        return data
    } catch (error) {
        return { message: "Det gick inte att hämta översikten just nu" }
    }
}