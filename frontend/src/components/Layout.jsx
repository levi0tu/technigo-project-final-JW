import { Link } from "react-router-dom"

export const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <h1>Växla Upp</h1>
                <nav>
                    <Link to="/">Hem</Link>
                    <Link to="/login">Logga in</Link>
                    <Link to="/register">Skapa konto</Link>
                    <Link to="/simulator">Jämför köp</Link>
                    <Link to="/learn">Guider</Link>
                    <Link to="/dashboard">Översikt</Link>
                    <Link to="/debts">Mina skulder</Link>

                </nav>
            </header>
            <main>{children}</main>
        </div>
    )
}