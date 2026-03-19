import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Layout } from "../components/Layout"
import { getDebtById } from "../services/debtService"
import { createPayment, getPaymentsByDebtId } from "../services/paymentService"

export const DebtDetail = () => {
    const { id } = useParams()
    const [debt, setDebt] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [payments, setPayments] = useState([])
    const [paymentFormData, setPaymentFormData] = useState({
        amount: "",
        paymentDate: "",
    })

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

    const handlePaymentChange = (event) => {
        const { name, value } = event.target

        setPaymentFormData({
            ...paymentFormData,
            [name]: value,
        })
    }

    const handlePaymentSubmit = async (event) => {
        event.preventDefault()

        const data = await createPayment({
            ...paymentFormData,
            debtId: id,
        })

        setPayments([...payments, data])
        setPaymentFormData({
            amount: "",
            paymentDate: "",
        })
    }

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
            <form onSubmit={handlePaymentSubmit}>
                <h3>Betalningar</h3>
                <label htmlFor="amount">Betalningsbelopp</label>
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    value={paymentFormData.amount}
                    onChange={handlePaymentChange}
                />

                <label htmlFor="paymentDate">Betalningsdatum</label>
                <input
                    id="paymentDate"
                    name="paymentDate"
                    type="date"
                    value={paymentFormData.paymentDate}
                    onChange={handlePaymentChange}
                />
                <button>Registrera betalning</button>
            </form>
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
