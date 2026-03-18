import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { AuthContext } from "../context/AuthContext"
import { getDashboardData } from "../services/dashboardService"

export const Dashboard = () => {
    const { user, setUser, setIsLoggedIn } = useContext(AuthContext)
    const [dashboardData, setDashboardData] = useState(null)

    useEffect(() => {
        const fetchDachboardData = async () => {
            const data = await getDashboardData()
            setDashboardData(data)
        }

        fetchDachboardData()
    }, [])
    const navigate = useNavigate()

    const handleLogout = () => {
        setIsLoggedIn(false)
        setUser(null)
        navigate("/login")
    }

    return (
        <Layout>
            <h2>Översikt</h2>
            <p>Här ser du snabbt hur läget ser ut just nu.</p>
            <p>Välkommen {user?.name}</p>
            <p>Antal skulder: {dashboardData?.debtCount}</p>
            <p>Antal betalningar: {dashboardData?.paymentCount}</p>
            <button onClick={handleLogout}>Logga ut</button>
        </Layout>
    )
}