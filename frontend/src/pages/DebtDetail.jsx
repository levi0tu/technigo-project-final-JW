import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Layout } from "../components/Layout"
import { getDebtById } from "../services/debtService"

export const DebtDetail = () => {
    const { id } = useParams()
    const [debt, setDebt] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchDebt = async () => {
            const data = await getDebtById(id)
            setDebt(data)
            setIsLoading(false)
        }

        fetchDebt()
    }, [id])

    return (
        <Layout>
            <h2>Skulddetaljer</h2>
            <p>Här ser du detaljerna för din skuld.</p>
            <p>Skuld-ID: {id}</p>
            {isLoading ? (
                <p>Laddar skuld...</p>
            ) : debt ? (
                <>
                    <p>Skuld: {debt.name}</p>
                    <p>Totalt belopp: {debt.totalAmount} kr</p>
                    <p>Månadsbetalning: {debt.monthlyPayment} kr</p>
                    <p>Ränta: {debt.interestRate} %</p>
                </>
            ) : (
                <p>Skulden kunde inte hittas.</p>
            )}
        </Layout>
    )
}
