import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"
import { createDebt, getDebts } from "../services/debtService"



export const Debts = () => {
    const [debts, setDebts] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        totalAmount: "",
        monthlyPayment: "",
        insterestRate: "",
    })

    useEffect(() => {
        const fetchDebts = async () => {
            const data = await getDebts()
            setDebts(data)
        }
        fetchDebts()
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = await createDebt(formData)
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
            {debts.map((debt) => (
                <div key={debt._id}>
                    <Link to={`/debts/${debt._id}`}>{debt.name}</Link>
                </div>
            ))}
        </Layout>
    )
}
