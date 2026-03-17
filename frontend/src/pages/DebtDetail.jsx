import { useParams } from "react-router-dom"
import { Layout } from "../components/Layout"

export const DebtDetail = () => {
    const { id } = useParams()

    const debts = [
        { id: "1", name: "Phone" },
        { id: "2", name: "Jeans" },
    ]

    const debt = debts.find((item) => item.id === id)

    return (
        <Layout>
            <h2>Debt Detail</h2>
            <p>Debt ID: {id}</p>
            <p>Debt name: {debt ? debt.name : "Not found"}</p>
        </Layout>
    )
}
