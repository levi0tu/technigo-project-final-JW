import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"
import { createDebt, getDebts } from "../services/debtService"
import { AuthContext } from "../context/AuthContext"



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

    return (
        <Layout>
            <h2>Mina skulder</h2>
            <p>Här ser du alla dina skulder på ett ställe</p>
            <h3>Lägg till en ny skuld</h3>
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
                <button>Lägg till skuld</button>
            </form>
            <h3>Dina skulder</h3>
            {isLoading ? (
                <p>Laddar skulder...</p>
            ) : debts.length === 0 ? (
                <p>Du har inga skulder. Yay!</p>
            ) : (
                debts.map((debt) => (
                    <div key={debt._id}>
                        <Link to={`/debts/${debt._id}`}>{debt.name}</Link>
                    </div>
                ))
            )}
        </Layout>
    )
}
