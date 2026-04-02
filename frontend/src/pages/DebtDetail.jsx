import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Layout } from "../components/Layout"
import { getDebtById } from "../services/debtService"
import { createPayment, getPaymentsByDebtId } from "../services/paymentService"
import { formatCurrency } from "../utility/formatCurrency"

export const DebtDetail = () => {
    const { id } = useParams()
    const [debt, setDebt] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [payments, setPayments] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [paymentFormData, setPaymentFormData] = useState({
        amount: "",
        paymentDate: "",
    })

    useEffect(() => {
        const fetchDebt = async () => {
            const data = await getDebtById(id)

            if (data?.message) {
                setErrorMessage("Det gick inte att hämta skulden just nu.")
                setIsLoading(false)
                return
            }

            setDebt(data)

            const paymentData = await getPaymentsByDebtId(id)

            if (paymentData?.message) {
                setErrorMessage("Det gick inte att hämta betalningarna just nu.")
                setPayments([])
                setIsLoading(false)
                return
            }

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
        setErrorMessage("")
        event.preventDefault()

        if (Number(paymentFormData.amount) <= 0) {
            setErrorMessage("Betalningsbelopp måste vara större än 0")
            return
        }

        if (!paymentFormData.paymentDate) {
            setErrorMessage("Betalningsdatum måste fyllas i")
            return
        }
        const data = await createPayment({
            ...paymentFormData,
            debtId: id,
        })

        if (data?.message) {
            setErrorMessage("Det gick inte att skapa betalningen. Kontrollera uppgifterna och försök igen.")
            return
        }

        setPayments([...payments, data])
        setPaymentFormData({
            amount: "",
            paymentDate: "",
        })
    }

    return (
        <Layout>
            <Link className="back-link" to="/debts">← Tillbaka till Mina skulder</Link>
            <section className="base-card">
                <div className="page-hero">
                    <h2 className="page-title">Skulddetaljer</h2>
                    <p className="page-description">
                        Här ser du detaljerna för din skuld.</p>
                </div>
                {isLoading ? (
                    <p>Laddar skuld...</p>
                ) : debt ? (
                    <>
                        <p>Skuld-namn: {debt.name}</p>
                        <p>Totalt belopp: {debt.totalAmount} kr</p>
                        <p>Månadsbetalning: {debt.monthlyPayment} kr</p>
                        <p>Ränta: {debt.interestRate} %</p>
                    </>
                ) : (
                    <p>Skulden kunde inte hittas.</p>
                )}

                <h3>Registrera betalning</h3>
                <form onSubmit={handlePaymentSubmit}>

                    <label htmlFor="amount">Betalningsbelopp</label>
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        value={paymentFormData.amount}
                        onChange={handlePaymentChange}
                        required
                        min="1"
                    />

                    <label htmlFor="paymentDate">Betalningsdatum</label>
                    <input
                        id="paymentDate"
                        name="paymentDate"
                        type="date"
                        value={paymentFormData.paymentDate}
                        onChange={handlePaymentChange}
                        required
                    />
                    <button className="button button-inverted">Registrera avbetalning</button>
                </form>
                {errorMessage && <p className="auth-error">{errorMessage}</p>}
            </section>

            <section className="payments-history">
                <h3>Tidigare betalningar</h3>

                {payments.length === 0 ? (
                    <p>Inga registrerade avbetalningar</p>
                ) : (
                    <div className="payment-history-list">
                        {payments.map((payment) => (
                            <article key={payment._id} className="payment-history-card">
                                <p className="card-label">Belopp</p>
                                <p className="card-amount">{formatCurrency(payment.amount)} kr</p>
                                <p className="card-meta">Datum: {payment.paymentDate.slice(0, 10)}</p>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </Layout>
    )
}
