import { useParams } from "react-router-dom"
import { Layout } from "../components/Layout"

export const DebtDetail = () => {
    const { id } = useParams()

    return (
        <Layout>
            <h2>Debt Detail</h2>
            <p>Debt ID: {id}</p>
        </Layout>
    )
}
