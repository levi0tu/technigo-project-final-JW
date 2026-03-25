import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"
import {
    LuBadgePercent,
    LuWalletCards,
    LuSparkles,
} from "react-icons/lu"

export const Home = () => {
    return (
        <Layout>
            <section className="home-hero">
                <p className="home-kicker">Framtidens ekonomi</p>
                <h2 className="home-hero-title">Äg dina pengar,
                    <span> innan pengarna äger dig.</span>
                </h2>
                <p className="home-lead">
                    Vi hjälper dig att bryta cirkeln av osynliga skulder och räntefällor.
                    Ta kontroll över din ekonomi med smarta verktyg för bättre kontroll i vardagen.
                </p>
                <div className="home-hero-actions">
                    <Link className="home-primary-action" to="/login">
                        Logga in
                    </Link>
                    <Link className="home-secondary-action" to="/register">
                        Registera konto
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
                        <div className="value-icon value-icon-teal">
                            <LuBadgePercent />
                        </div>
                        <h4>Förstå den verkliga kostnaden</h4>
                        <p>
                            Jämför direktköp och delbetalning för att se vad ett köp
                            faktiskt kostar.
                        </p>
                    </article>
                    <article className="home-value-card">
                        <div className="value-icon value-icon-cyan">
                            <LuWalletCards />
                        </div>
                        <h4>Få full koll på dina avbetalningar</h4>
                        <p>
                            Samla dina skulder på ett ställe och följ hur mycket
                            som redan är betalt.
                        </p>
                    </article>
                    <article className="home-value-card">
                        <div className="value-icon value-icon-purple">
                            <LuSparkles />
                        </div>
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