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
            <h2>Jämför köp</h2>
            <p>Jämför köp direkt med delbetalning och se skillnaden</p>
            <p>Se vad delbetalning faktiskt kostar innan du bestämmer dig.</p>
            <p>Det här är en enkel jämförelse mellan direktköp och delbetalning.</p>
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
            <p>Total kostnad med delbetalning: {installmentTotal} kr</p>
            <p>Skillnad mot direktköp: {difference}</p>
        </Layout>
    )
}