import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"

export const Debts = () => {
    const debts = [
        { id: 1, name: "Mobil" },
        { id: 2, name: "Jeans" },
    ]

    return (
        <Layout>
            <h2>Mina skulder</h2>
            {debts.map((debt => (
                <div key={debt.id}>
                    <Link to={`/debts/${debt.id}`}>{debt.name}</Link>
                </div>
            )))}
        </Layout>
    )
}