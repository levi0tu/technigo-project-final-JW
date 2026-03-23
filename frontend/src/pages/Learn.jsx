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
    return (
        <Layout>
            <Link className="back-link" to="/">← Tillbaka till Startsidan</Link>
            <h2>Guider</h2>
            <p>Få bättre koll på ränta, krediter och avbetalningar.</p>
            {lessons.map((lesson) => (
                <div key={lesson._id}>
                    <h3>{lesson.title}</h3>
                    <p>{lesson.content}</p>
                </div>
            ))}
        </Layout>
    )
}