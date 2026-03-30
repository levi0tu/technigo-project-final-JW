import { useState } from "react"
import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"
import { formatCurrency } from "../utility/formatCurrency.js"
import { BsCalculator, BsInfoCircle } from "react-icons/bs"
import { HiMiniCheckBadge, HiMiniExclamationTriangle } from "react-icons/hi2"

export const Simulator = () => {
    const [formData, setFormData] = useState({
        cashPrice: 1000,
        monthlyCost: 100,
        months: "",
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData({
            ...formData,
            [name]: Number(value),
        })
    }
    const cashPrice = Number(formData.cashPrice)
    const monthlyCost = Number(formData.monthlyCost)
    const months = Number(formData.months)
    const minMonths =
        monthlyCost > 0 ? Math.ceil(cashPrice / monthlyCost) : 1
    const effectiveMonths = Math.max(months || 1, minMonths)

    const rawInstallmentTotal = monthlyCost * effectiveMonths
    const installmentTotal = Math.max(rawInstallmentTotal, cashPrice)
    const difference = installmentTotal - cashPrice


    return (
        <Layout>
            <Link className="back-link" to="/">← Tillbaka till Startsidan</Link>

            <section className="page-hero">
                <h2 className="page-title">Köp nu eller dela upp?</h2>
                <p className="page-description">Se vad delbetalning faktiskt kostar innan du bestämmer dig</p>
            </section>
            <div className="simulator-layout-grid">
                <section className="base-card">
                    <div className="simulator-card-header">
                        <div className="value-icon value-icon-cyan">
                            <BsCalculator />
                        </div>
                        <div>
                            <h3>Din jämförelse</h3>
                            <p>Justera reglagen för att se hur valet påverkar totalpriset</p>
                        </div>
                    </div>

                    <label htmlFor="cashPrice">Inköpspris</label>
                    <p className="simulator-slider-value">{formatCurrency(cashPrice)} kr</p>
                    <input
                        id="cashPrice"
                        name="cashPrice"
                        type="range"
                        min="1000"
                        max="100000"
                        step="500"
                        value={formData.cashPrice}
                        onChange={handleChange}
                    />
                    <label htmlFor="monthlyCost">Månadskostnad</label>
                    <p className="simulator-slider-value">{formatCurrency(monthlyCost)} kr</p>
                    <input
                        id="monthlyCost"
                        name="monthlyCost"
                        type="range"
                        min="100"
                        max="20000"
                        step="100"
                        value={formData.monthlyCost}
                        onChange={handleChange}
                    />

                    <label htmlFor="months">Antal månader</label>
                    <p className="simulator-slider-value">{effectiveMonths} mån</p>
                    <input
                        id="months"
                        name="months"
                        type="range"
                        min={minMonths}
                        max="48"
                        step="1"
                        value={effectiveMonths}
                        onChange={handleChange}
                    />
                </section>

                <section className="simulator-result-section">
                    <h3>Resultatjämförelse</h3>

                    <div className="simulator-results">
                        <div className="surface-positive">
                            <p className="card-label">Direktköp</p>
                            <p className="simulator-result-amount card-amount">{formatCurrency(formData.cashPrice)} kr</p>
                            {difference > 0 && (<p className="simulator-status simulator-status--good">Lägre totalkostnad</p>)}
                        </div>
                        <div className="surface-data">
                            <p className="card-label">Total kostnad vid delbetalning</p>
                            <p className="simulator-highlight-amount card-amount">{formatCurrency(installmentTotal)} kr</p>
                        </div>
                        <div className="simulator-highlight-meta">
                            <div>
                                <p className="card-label">Extra kostnad</p>
                                <p className="simulator-highlight-meta-value">
                                    {difference > 0 ? "+" : ""}
                                    {formatCurrency(difference)} kr
                                </p>
                            </div>

                            <div>
                                <p className="card-label">Tid att betala av</p>
                                <p className="simulator-highlight-meta-value">{effectiveMonths} månader</p>
                            </div>
                        </div>
                    </div>

                    <div className="simulator-info-card">
                        <BsInfoCircle />
                        <p>
                            Extra kostnad kan bestå av ränta och avgifter. Överväg om direktköp är mer fördelaktigt för din ekonomi i längden.
                        </p>
                    </div>
                </section>
            </div >
        </Layout >
    )
}