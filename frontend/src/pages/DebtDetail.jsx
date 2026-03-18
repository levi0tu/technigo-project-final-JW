import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Layout } from "../components/Layout"
import { getDebtById } from "../services/debtService"
import { getPaymentsByDebtId } from "../services/paymentService"

export const DebtDetail = () => {
    const { id } = useParams()
    const [debt, setDebt] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [payments, setPayments] = useState([])

    useEffect(() => {
        const fetchDebt = async () => {
            const data = await getDebtById(id)
            setDebt(data)

            const paymentData = await getPaymentsByDebtId(id)
            setPayments(paymentData)

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

            <h3>Betalningar</h3>
            {payments.length === 0 ? (
                <p>Inga registrerade betalningar</p>
            ) : (
                payments.map((payment) => (
                    <div key={payment._id}>
                        <p>Belopp: {payment.amount} kr</p>
                        <p>Datum: {payment.paymentDate}</p>
                    </div>
                ))
            )}
        </Layout>
    )
}
