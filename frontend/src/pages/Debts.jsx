import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"
import { getDebts } from "../services/debtService"



export const Debts = () => {
    const [debts, setDebts] = useState([])
    useEffect(() => {
        const fetchDebts = async () => {
            const data = await getDebts()
            setDebts(data)
        }
        fetchDebts()
    }, [])

    return (
        <Layout>
            <h2>Mina skulder</h2>
            <p>Här ser du alla dina skulder på ett ställe</p>
            {debts.map((debt) => (
                <div key={debt._id}>
                    <Link to={`/debts/${debt._id}`}>{debt.name}</Link>
                </div>
            ))}
        </Layout>
    )
}
