import { useState } from "react"
import { Layout } from "../components/Layout"

export const Simulator = () => {
    const [formData, setFormData] = useState({
        cashPrice: "",
        monthlyCost: "",
        months: "",
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

    return (
        <Layout>
            <section className="hero-intro">
                <h2>Jämför köp</h2>
                <p>Se den dolda kostnaden med delbetalning</p>
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
                    <h3>Direktköp</h3>
                    <p>{formData.cashPrice || 0} kr</p>
                    <p>0 kr i extra kostnad</p>
                </section>
                <section className="simulator-result-card pay-later">
                    <h3>Delbetalning</h3>
                    <p>{installmentTotal || 0} kr</p>
                    <p>{difference || 0} kr i extra kostnad</p>
                </section>
            </section>

        </Layout>
    )
}