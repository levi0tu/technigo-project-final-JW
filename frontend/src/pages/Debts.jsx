import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LuWallet } from "react-icons/lu";
import { Layout } from "../components/Layout"
import { createDebt, getDebts } from "../services/debtService"
import { AuthContext } from "../context/AuthContext"
import { formatCurrency } from "../utility/formatCurrency.js"
import { useLocation } from "react-router-dom"

export const Debts = () => {
    const [debts, setDebts] = useState([])
    const { user } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const [formData, setFormData] = useState({
        name: "",
        totalAmount: "",
        monthlyPayment: "",
        interestRate: "",
    })
    const location = useLocation()
    useEffect(() => {
        if (!user) return

        const fetchDebts = async () => {
            setIsLoading(true)
            const data = await getDebts(user.id)
            setDebts(data)
            setIsLoading(false)
        }
        fetchDebts()
    }, [user])

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = await createDebt({
            ...formData,
            userId: user.id,
        })
        setDebts([...debts, data])
        setFormData({
            name: "",
            totalAmount: "",
            monthlyPayment: "",
            interestRate: "",
        })
    }

    useEffect(() => {
        if (isLoading) return
        if (!location.hash) return

        const element = document.querySelector(location.hash)
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }, [location.hash, isLoading, debts])

    return (
        <Layout>

            <Link className="back-link" to="/dashboard">← Tillbaka till Översikt</Link>
            <h2><LuWallet /> Mina skulder</h2>

            <div className="debts-layout-grid">
                <div className="debts-main-column">
                    <section className="debts-summary-card surface-positive">
                        <p className="card-label">Totalt att betala</p>
                        <p className="debts-summary-amount card-amount">{formatCurrency(debts.reduce((sum, debt) => sum + Number(debt.totalAmount), 0))}</p>
                        <p className="debts-summary-meta card-meta">{debts.length} aktiva skulder</p>
                    </section>

                    <div className="debts-section-header">
                        <h3>Aktiva skulder</h3>
                        <p>{debts.length} poster</p>
                    </div>

                    <div className="debt-list">
                        {isLoading ? (
                            <p>Laddar skulder...</p>
                        ) : debts.length === 0 ? (
                            <p>Du har inga skulder registrerade än.</p>
                        ) : (
                            debts.map((debt) => {
                                const paidPercentage = debt.totalAmount
                                    ? Math.min(100, Math.round(((Number(debt.paidAmount) || 0) / Number(debt.totalAmount)) * 100))
                                    : 0

                                return (
                                    <div key={debt._id} className="debt-item">
                                        <div className="debt-item-top">
                                            <Link to={`/debts/${debt._id}`}>{debt.name}
                                            </Link>
                                        </div>
                                        <p className="debt-item-meta card-label">Skuld</p>
                                        <p className="debt-item-amount">{formatCurrency(debt.totalAmount)} kr</p>
                                        <Link className="button button-primary" to={`/debts/${debt._id}`}>
                                            Visa skuld
                                        </Link>

                                        <div className="debt-item-footer">
                                            <p className="debt-item-progress-text">{paidPercentage}% betalt</p>
                                            <div className="debt-item-progress">
                                                <div className="debt-item-progress-fill"
                                                    style={{ width: `${paidPercentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div >

                <section id="debt-form" className="debt-form-section surface-learning">
                    <h3>Lägg till en ny skuld</h3>
                    <p>Fyll i uppgifterna så får du bättre koll direkt.</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Skuld</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="totalAmount">Totalt belopp</label>
                        <input
                            id="totalAmount"
                            name="totalAmount"
                            type="number"
                            value={formData.totalAmount}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="monthlyPayment">Månadsbetalning</label>
                        <input
                            id="monthlyPayment"
                            name="monthlyPayment"
                            type="number"
                            value={formData.monthlyPayment}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="interestRate">Ränta</label>
                        <input
                            id="interestRate"
                            name="interestRate"
                            type="number"
                            value={formData.interestRate}
                            onChange={handleChange}
                            required
                        />
                        <button className="button button-primary">Lägg till skuld</button>

                    </form>
                </section>
            </div>
        </Layout >
    )
}
