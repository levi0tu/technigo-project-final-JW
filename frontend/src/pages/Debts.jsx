import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"

export const Debts = () => {
    const debts = [
        { id: 1, name: "Phone" },
        { id: 2, name: "Jeans" },
    ]

    return (
        <Layout>
            <h2>My Debts</h2>
            {debts.map((debt => (
                <div key={debt.id}>
                    <Link to={`/debts/${debt.id}`}>{debt.name}</Link>
                    <Link to="/debts/99">Open missing debt</Link>
                </div>
            )))}
        </Layout>
    )
}