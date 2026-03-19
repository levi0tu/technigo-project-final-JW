import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { AuthContext } from "../context/AuthContext"
import { getDashboardData } from "../services/dashboardService"

export const Dashboard = () => {
    const { user, setUser, setIsLoggedIn } = useContext(AuthContext)
    const [dashboardData, setDashboardData] = useState(null)

    useEffect(() => {
        if (!user) return

        const fetchDachboardData = async () => {
            const data = await getDashboardData(user.id)
            setDashboardData(data)
        }

        fetchDachboardData()
    }, [user])
    const navigate = useNavigate()

    const handleLogout = () => {
        setIsLoggedIn(false)
        setUser(null)
        navigate("/login")
    }

    return (
        <Layout>
            <h2>Översikt</h2>
            <p>Här får du snabb koll på läget.</p>
            <p>Välkommen {user?.name}</p>
            <div className="dashboard-stats">
                <p>Antal skulder: {dashboardData?.debtCount}</p>
                <p>Antal betalningar: {dashboardData?.paymentCount}</p>
            </div>
            <button onClick={handleLogout}>Logga ut</button>
        </Layout>
    )
}