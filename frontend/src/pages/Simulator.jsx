import { useState } from "react"
import { Layout } from "../components/Layout"

export const Simulator = () => {
    const [formData, setFormData] = useState({
        cashPrice: "",
        monthlyCost: "",
        months: "",
        interestRate: "",
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const installmentTotal = Number(formData.monthlyCost) * (formData.months)
    const difference = installmentTotal - Number(formData.cashPrice)
    const formatCurrency = (value) =>
        new Intl.NumberFormat("sv-SE").format(Number(value) || 0)

    return (
        <Layout>
            <section className="hero-intro">
                <h2>Jämför köp</h2>
                <p>Se vad delbetalning faktiskt kostar innan du bestämmer dig</p>
            </section>
            <section className="simulator-input-card">
                <label htmlFor="cashPrice">Pris vid direktköp</label>
                <input
                    id="cashPrice"
                    name="cashPrice"
                    type="number"
                    value={formData.cashPrice}
                    onChange={handleChange}
                />
                <label htmlFor="monthlyCost">Månadskostnad</label>
                <input
                    id="monthlyCost"
                    name="monthlyCost"
                    type="number"
                    value={formData.monthlyCost}
                    onChange={handleChange}
                />
                <label htmlFor="interestRate">Ränta</label>
                <input
                    id="interestRate"
                    name="interestRate"
                    type="number"
                    value={formData.interestRate}
                    onChange={handleChange}
                />
                <label htmlFor="months">Antal månader</label>
                <input
                    id="months"
                    name="months"
                    type="number"
                    value={formData.months}
                    onChange={handleChange}
                />
            </section>
            <section className="simulator-results">
                <section className="simulator-result-card pay-now">
                    <p className="simulator-badge">Bäst val</p>
                    <h3>Direktköp</h3>
                    <p className="simulator-result-amount">{formatCurrency(formData.cashPrice)} kr</p>
                    {difference > 0 && (<p className="simulator-status simulator-status--good">Lägre totalkostnad</p>)}

                </section>
                <section className="simulator-result-card pay-later">
                    <p className="simulator-badge simulator-badge--muted">Dyrare val</p>
                    <h3>Delbetalning</h3>
                    <p className="simulator-result-amount">{formatCurrency(installmentTotal)} kr</p>
                    {difference > 0 && (<p className="simulator-status simulator-status--warning">Högre total kostnad</p>)}



                </section>
            </section>
            <section className="simulator-impact-card">
                <p className="simulator-result-label">Totalkostnad</p>
                <p className="simulator-impact-level">Skillnad i kr</p>
                <p className="simulator-impact-value">{formatCurrency(difference)} kr</p>
                {difference > 0 && (<p className="simulator-impact-text">Så mycket mer kostar delbetalning jämfört med direktbetalning</p>)}
            </section>
        </Layout>
    )
}