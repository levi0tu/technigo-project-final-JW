import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"

export const Debts = () => {
    return (
        <Layout>
            <h2>My Debts</h2>
            <Link to="/debts/1">Open Debt</Link>
        </Layout>
    )
}