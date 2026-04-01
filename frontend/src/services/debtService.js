const BASE_URL = "http://localhost:8080"


export const getDebts = async () => {
    const token = localStorage.getItem("token")

    const response = await fetch(`${BASE_URL}/debts`, {
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

export const getDebtById = async (id) => {
    const token = localStorage.getItem("token")

    const response = await fetch(`${BASE_URL}/debts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (response.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.href = "/login"
        return
    }
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

    if (response.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.href = "/login"
        return
    }

    const data = await response.json()
    return data
}

