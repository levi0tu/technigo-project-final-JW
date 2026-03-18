import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Layout } from "../components/Layout"
import { getDebtById } from "../services/debtService"

export const DebtDetail = () => {
    const { id } = useParams()
    const [debt, setDebt] = useState(null)

    useEffect(() => {
        const fetchDebt = async () => {
            const data = await getDebtById(id)
            setDebt(data)
        }

        fetchDebt()
    }, [id])

    return (
        <Layout>
            <h2>Skulddetaljer</h2>
            <p>Här ser du detaljerna för din skuld.</p>
            <p>Skuld-ID: {id}</p>
            <p>Skuld: {debt ? debt.name : "Hittades inte"}</p>
        </Layout>
    )
}
