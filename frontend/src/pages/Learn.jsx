import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"
import { getLessons } from "../services/lessonService"
import featuredImage from "../images/pexels-serhii-barkanov-2144469453-35382218.jpg"
import { formatCurrency } from "../utility/formatCurrency.js"
import { BsGraphUpArrow, BsLightbulb } from "react-icons/bs";
import { LuBookOpen } from "react-icons/lu"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"


export const Learn = () => {
    const [lessons, setLessons] = useState([])

    useEffect(() => {
        const fetchLessons = async () => {
            const data = await getLessons()
            setLessons(data)
        }

        fetchLessons()
    }, [])

    const featuredLesson = lessons[0]
    const moduleLessons = lessons.slice(1)
    //Ränta på ränta kalkylator
    const [compoundFormData, setCompoundFormData] = useState({
        interestRate: 7,
        monthlySaving: 1000,
        startingAmount: 1000,
        years: 20,
    })
    const monthlyRate = compoundFormData.interestRate / 100 / 12
    const totalMonths = compoundFormData.years * 12

    let futureValue = Number(compoundFormData.startingAmount)

    for (let i = 0; i < totalMonths; i++) {
        futureValue = futureValue * (1 + monthlyRate) + Number(compoundFormData.monthlySaving)
    }

    const handleCompoundChange = (event) => {
        const { name, value } = event.target

        setCompoundFormData({
            ...compoundFormData,
            [name]: Number(value),
        })
    }

    return (
        <Layout>
            <Link className="back-link" to="/">← Tillbaka till Startsidan</Link>

            <section className="page-hero">
                <h2 className="page-title">Pengakoll</h2>
                <p className="page-description">
                    Små lektioner och smarta verktyg för ränta, lån och bättre vanor.</p>
            </section>

            <section className="learn-desktop-grid">
                <div className="learn-main-column">
                    <section className="learn-featured-card">
                        <img
                            src={featuredImage}
                            alt="green leaves"
                            className="learn-featured-image"
                        />
                        <div className="learn-featured-overlay">
                            <h2>Ränta, hur påverkar den ditt köp?</h2>
                            <p>Lär dig hur små ekonomiska beslut växer över tid och hur du kan fatta smartare val direkt.</p>
                            <Link className="learn-featured-action" to="/simulator">
                                Räkna på ditt köp
                            </Link>
                        </div>
                    </section>

                    <section className="learn-insight-card learning-card">
                        <div className="learn-insight-header">
                            <div className="value-icon value-icon-purple">
                                <BsLightbulb />
                            </div>
                            <p className="card-label">Dagens insikt</p>
                        </div>
                        <p className="learn-insight-text">Små kostnader blir stora snabbare än man tror. Förstå räntan tidigt,
                            så behåller du kontrollen.
                        </p>
                    </section>
                </div>

                <section className="learn-calculator base-card">
                    <div className="value-icon value-icon-cyan"><BsGraphUpArrow /></div>
                    <h3>Ränta på ränta-kalkylator</h3>
                    <p>Se hur ditt sparande växer över tid.</p>
                    <label htmlFor="startingAmount">Startbelopp (kr)</label>
                    <p>{formatCurrency(compoundFormData.startingAmount)} kr</p>
                    <input
                        id="startingAmount"
                        name="startingAmount"
                        type="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={compoundFormData.startingAmount}
                        onChange={handleCompoundChange}
                    />
                    <label htmlFor="monthlySaving">Månadssparande (kr/mån)</label>
                    <p>{formatCurrency(compoundFormData.monthlySaving)} kr</p>
                    <input
                        id="monthlySaving"
                        name="monthlySaving"
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={compoundFormData.monthlySaving}
                        onChange={handleCompoundChange}
                    />
                    <label htmlFor="interestRate">Ränta per år (%)</label>
                    <p>{compoundFormData.interestRate}%</p>
                    <input
                        id="interestRate"
                        name="interestRate"
                        type="range"
                        min="0"
                        max="15"
                        step="1"
                        value={compoundFormData.interestRate}
                        onChange={handleCompoundChange}
                    />
                    <label htmlFor="years">Sparhorisont</label>
                    <p>{compoundFormData.years} år</p>
                    <input
                        id="years"
                        name="years"
                        type="range"
                        min="1"
                        max="40"
                        step="1"
                        value={compoundFormData.years}
                        onChange={handleCompoundChange}
                    />
                    <div className="learn-calculator-result surface-data">
                        <p>Totalt spar-belopp efter {compoundFormData.years} år</p>
                        <h4>{formatCurrency(Math.round(futureValue))} kr</h4>
                    </div>
                </section>
            </section>

            <section className="learn-modules-section">
                <div className="learn-section-title">
                    <div className="value-icon value-icon-purple">
                        <LuBookOpen />
                    </div>
                    <h3>Tips</h3>
                </div>
                <p className="learn-slider-hint">Svep för att se fler tips →</p>
                <Swiper
                    spaceBetween={16}
                    slidesPerView={1.2}
                    className="learn-modules-slider"
                >
                    {lessons.map((lesson) => (
                        <SwiperSlide key={lesson._id}>
                            <article className="learn-module-card">
                                <h4>{lesson.title}</h4>
                                <p>{lesson.content}</p>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </Layout >
    )
}