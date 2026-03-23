import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"
import { getLessons } from "../services/lessonService"

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

    return (
        <Layout>
            <Link className="back-link" to="/">← Tillbaka till Startsidan</Link>
            <section className="learn-hero">
                <h2 className="learn-kicker">Guider</h2>
                <p>Kunskap är frihet</p>
                <p>Små lektioner som hjälper dig förstå lån, ränta, krediter och avbetalningar.</p>
            </section>

            <section className="learn-level-card">
                <div className="learn-level-header">
                    <p className="learn-level-label">Din nivå</p>
                    <p className="learn-level-progress">5/8 lektioner klara</p>
                </div>
                <h3>Nivå 3: Skuld-krigare</h3>
                <div className="learn-progress-bar">
                    <div className="learn-progress-fill"></div>
                </div>
            </section>
            <p>{lessons.length} lessons</p>

            {featuredLesson && (
                <section className="learn-featured-card">
                    <p className="learn-card-tag">Utvald lektion</p>
                    <h3>{featuredLesson.title}</h3>
                    <p>{featuredLesson.content}</p>
                    <Link className="learn-featured-action" to="/">
                        Starta lektion
                    </Link>
                </section>
            )}
            <section className="learn-insight-card">
                <p className="learn-card-tag">Dagens insikt</p>
                <p>
                    Små kostnader blir stora snabbare än man tror. Förstå räntan tidigt,
                    så behåller du kontrollen.
                </p>
            </section>
            <section className="learn-locked-section">
                <div className="learn-section-header">
                    <h3>Lås upp</h3>
                    <p>Kräver nivå 5</p>
                </div>
                <div className="learn-locked-list">
                    <article className="learn-locked-card">
                        <h4>Investeringspsykologi</h4>
                        <p>Kommer senare</p>
                    </article>

                    <article className="learn-locked-card">
                        <h4>Skatte-optimering</h4>
                        <p>Kommer senare</p>
                    </article>
                </div>
            </section>
        </Layout>
    )
}