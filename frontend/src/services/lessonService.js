const BASE_URL = "http://localhost:8080"

export const getLessons = async () => {
    const response = await fetch(`${BASE_URL}/lessons`)
    const data = await response.json()
    return data
}
