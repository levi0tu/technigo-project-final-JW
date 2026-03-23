import { useState } from "react"
import { Layout } from "../components/Layout"
import { formatCurrency } from "../utility/formatCurrency.js"

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
    const cashPrice = Number(formData.cashPrice)
    const monthlyCost = Number(formData.monthlyCost)
    const months = Number(formData.months)
    const interestRate = Number(formData.interestRate)
    const estimatedInterest = cashPrice * (interestRate / 100) * (months / 12)
    const estimatedInstallmentTotal = cashPrice + estimatedInterest
    const hasExactInstallmentData = monthlyCost > 0 && months > 0
    const hasEstimatedInstallmentData = cashPrice > 0 && interestRate > 0 && months > 0
    const installmentTotal = hasExactInstallmentData
        ? monthlyCost * months
        : hasEstimatedInstallmentData
            ? estimatedInstallmentTotal
            : 0
    const calculationMode = hasExactInstallmentData
        ? "exact"
        : hasEstimatedInstallmentData
            ? "estimated"
            : "none"
    const calculationModeText =
        calculationMode === "exact"
            ? "Baserat på din månadsbetalning"
            : calculationMode === "estimated"
                ? "Uppskattat från ränta"
                : "Fyll i fler uppgifter"

    const difference = installmentTotal - cashPrice

    const errorMessage =
        installmentTotal > 0 && difference < 0
            ? "Kontrollera dina värden. Delbetalning kan inte bli billigare här."
            : ""

    return (
        <Layout>
            <section className="hero-intro">
                <h2>Jämför köp</h2>
                <p>Se vad delbetalning faktiskt kostar innan du bestämmer dig</p>
            </section>
            <section className="simulator-input-card">
                <label htmlFor="cashPrice">Varans pris</label>
                <input
                    id="cashPrice"
                    name="cashPrice"
                    type="number"
                    value={formData.cashPrice}
                    onChange={handleChange}
                />
                <label htmlFor="monthlyCost">Fyll i månadskostnad om du vet den</label>
                <input
                    id="monthlyCost"
                    name="monthlyCost"
                    type="number"
                    value={formData.monthlyCost}
                    onChange={handleChange}
                />
                <div className="interest-rate-group">
                    <label htmlFor="interestRate">Ränta</label>
                    <p className="interest-rate-value">{interestRate || 0} %</p>
                    <input
                        id="interestRate"
                        name="interestRate"
                        type="range"
                        min="0"
                        max="30"
                        step="1"
                        value={formData.interestRate}
                        onChange={handleChange}

                    />
                    <p className="simulator-result-meta">
                        Använd räntan för en uppskattning om du inte vet månadskostnaden.
                    </p>
                </div>
                <label htmlFor="months">Antal månader</label>
                <input
                    id="months"
                    name="months"
                    type="number"
                    value={formData.months}
                    onChange={handleChange}
                />
            </section>
            {errorMessage && <p>{errorMessage}</p>}


            <section className="simulator-results">
                <section className="simulator-result-card pay-now">
                    {difference < 0 && <p className="simulator-badge">Bäst val</p>}
                    <h3>Direktköp</h3>
                    <p className="simulator-result-amount">{formatCurrency(formData.cashPrice)} kr</p>
                    {difference > 0 && (<p className="simulator-status simulator-status--good">Lägre totalkostnad</p>)}

                </section>
                <section className="simulator-result-card pay-later">
                    {difference > 0 && (<p className="simulator-badge simulator-badge--muted">Dyrare val</p>)}
                    <h3>Delbetalning</h3>
                    <p className="simulator-result-amount">{formatCurrency(installmentTotal.toFixed(0))} kr</p>
                    {difference > 0 && (<p className="simulator-status simulator-status--warning">Högre total kostnad</p>)}
                    <p>{calculationModeText}</p>
                </section>
            </section>
            <section className="simulator-impact-card">
                <p className="simulator-impact-level">Skillnad i kr</p>
                <p className="simulator-impact-value">{formatCurrency(difference.toFixed(0))} kr</p>
                {difference > 0 && (<p className="simulator-impact-text">Så mycket dyrare blir delbetalning</p>)}

            </section>
        </Layout>
    )
}