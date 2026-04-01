const BASE_URL = "http://localhost:8080"


// Hämtar dashboard-data för den inloggade användaren
//Token skickas med i Authorization headern så att backend kan identifiera användaren.
export const getDashboardData = async () => {
    const token = localStorage.getItem("token")

    const response = await fetch(`${BASE_URL}/dashboard`, {
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