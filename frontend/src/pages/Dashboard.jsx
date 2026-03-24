import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { AuthContext } from "../context/AuthContext"
import { getDashboardData } from "../services/dashboardService"
import { formatCurrency } from "../utility/formatCurrency.js"

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
            <p>Hej {user?.name}</p>
            <p>Här får du snabb koll på läget.</p>
            <section className="dashboard-hero">
                <p>Din skuldöversikt</p>
                <p className="dashboard-hero-amount">
                    {formatCurrency(dashboardData?.totalDebtAmount)} kr
                </p>
                <div className="dashboard-hero-actions">
                    <Link to="/debts">Lägg till skuld</Link>
                    <Link to="/debts">Visa skulder</Link>
                </div>
            </section>
            <div className="dashboard-stats">
                <div className="stat-card">
                    <p>Antal skulder: {dashboardData?.debtCount}</p>
                </div>
                <div className="stat-card">
                    <p>Antal betalningar: {dashboardData?.paymentCount}</p>
                </div>
            </div>
            <button onClick={handleLogout}>Logga ut</button>
        </Layout>
    )
}