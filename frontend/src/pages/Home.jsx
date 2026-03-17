import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"

export const Home = () => {
    return (
        <Layout>
            <h2>Växla Upp</h2>
            <p>Äg dina pengar – låt inte dina pengar äga dig.</p>
            <p>Växla upp din koll på pengarna</p>
            <Link to="/register">Kom igång</Link>
            <Link to="/simulator">Simulator</Link>
        </Layout>
    )
}