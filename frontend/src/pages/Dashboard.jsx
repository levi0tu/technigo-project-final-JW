import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { AuthContext } from "../context/AuthContext"
import { getDashboardData } from "../services/dashboardService"
import { formatCurrency } from "../utility/formatCurrency.js"
import { LuReceiptText, LuWalletCards } from "react-icons/lu"

export const Dashboard = () => {
    const { user, setUser, setIsLoggedIn } = useContext(AuthContext)
    const [dashboardData, setDashboardData] = useState(null)

    useEffect(() => {
        if (!user) return

        const fetchDashboardData = async () => {
            const data = await getDashboardData()
            setDashboardData(data)
        }

        fetchDashboardData()
    }, [user])
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setIsLoggedIn(false)
        setUser(null)
        navigate("/login")
    }

    return (
        <Layout>
            <section className="page-hero">
                <h2 className="page-title">Översikt</h2>
                <p className="page-description">Hej {user?.name}, här får du snabbt koll på läget.</p>
            </section>

            <section className="dashboard-hero base-card">
                <div className="dashboard-summary surface-data">
                    <p className="card-label">Din skuldöversikt</p>
                    <p className="dashboard-hero-amount card-amount">
                        {formatCurrency(dashboardData?.totalDebtAmount)} kr
                    </p>
                    <p className="card-meta">
                        {dashboardData?.debtCount ?? 0} skulder registrerade
                    </p>
                </div>
                <div className="dashboard-hero-actions">
                    <Link className="button button-primary" to="/debts#debt-form">Lägg till skuld</Link>
                    <Link className="button button-outlined" to="/debts">Visa skulder</Link>
                </div>
            </section>

            <section className="dashboard-stats">
                <div className="stat-card">
                    <div className="value-icon value-icon-cyan">
                        <LuWalletCards />
                    </div>
                    <p className="card-label">Antal skulder</p>
                    <p className="card-amount"> {dashboardData?.debtCount ?? 0}</p>
                    <p className="card-meta">Aktiva poster registrerade</p>
                </div>

                <div className="stat-card">
                    <div className="value-icon value-icon-teal">
                        <LuReceiptText />
                    </div>
                    <p className="card-label">Antal betalningar</p>
                    <p className="card-amount">{dashboardData?.paymentCount ?? 0}</p>
                    <p className="card-meta">Genomförda betalningar</p>
                </div>
            </section>
            <div className="dashboard-footer-actions">
                <button className="button button-outlined" onClick={handleLogout}>Logga ut</button>
            </div>
        </Layout>
    )
}