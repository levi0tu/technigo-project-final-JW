const BASE_URL = import.meta.env.VITE_API_URL

export const getLessons = async () => {
    const response = await fetch(`${BASE_URL}/lessons`)
    const data = await response.json()
    return data
}
