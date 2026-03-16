import { Link } from "react-router-dom"

export const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <h1>Plussidan</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/simulator">Simulator</Link>
                    <Link to="/learn">Learn</Link>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    )
}