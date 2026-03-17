import { useParams } from "react-router-dom"
import { Layout } from "../components/Layout"

export const DebtDetail = () => {
    const { id } = useParams()

    const debts = [
        { id: "1", name: "Mobil" },
        { id: "2", name: "Jeans" },
    ]

    const debt = debts.find((item) => item.id === id)

    return (
        <Layout>
            <h2>Skulddetaljer</h2>
            <p>Här ser du detaljerna för din skuld.</p>
            <p>Skuld-ID: {id}</p>
            <p>Skuld: {debt ? debt.name : "Hittades inte"}</p>
        </Layout>
    )
}
