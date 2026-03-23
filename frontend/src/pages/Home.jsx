import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"

export const Home = () => {
    return (
        <Layout>
            <section className="home-hero">
                <h2>Växla Upp</h2>
                <p>Äg dina pengar – låt inte dina pengar äga dig.</p>
                <p className="home-lead">
                    Ta kontroll över din ekonomi med smarta verktyg för skulder,
                    ränta och bättre beslut i vardagen.
                </p>
                <div className="home-hero-actions">
                    <Link className="home-primary-action" to="/register">
                        Kom igång
                    </Link>
                    <Link className="home-secondary-action" to="/simulator">
                        Se hur det funkar
                    </Link>
                </div>
            </section>
            <section className="home-value-section">
                <h3>Din finansiella fristad.</h3>
                <p>
                    Vi har byggt Växla Upp för att göra det lättare att förstå
                    kostnader, följa skulder och känna att du faktiskt har koll.
                </p>
                <div className="home-value-list">
                    <article className="home-value-card">
                        <h4>Förstå den verkliga kostnaden</h4>
                        <p>
                            Jämför direktköp och delbetalning för att se vad ett köp
                            faktiskt kostar.
                        </p>
                    </article>
                    <article className="home-value-card">
                        <h4>Få full koll på dina avbetalningar</h4>
                        <p>
                            Samla dina skulder på ett ställe och följ hur mycket
                            som redan är betalt.
                        </p>
                    </article>
                    <article className="home-value-card">
                        <h4>Bygg bättre ekonomiska vanor</h4>
                        <p>
                            Lär dig mer om ränta, krediter och smartare beslut
                            steg för steg.
                        </p>
                    </article>
                </div>
            </section>
            <section className="home-cta-card">
                <h3>Redo att växla upp?</h3>
                <p>
                    Börja med att skapa konto eller testa simulatorn och se hur
                    små val påverkar din ekonomi.
                </p>
                <Link className="home-primary-action" to="/register">
                    Kom igång nu
                </Link>
            </section>
        </Layout>
    )
}