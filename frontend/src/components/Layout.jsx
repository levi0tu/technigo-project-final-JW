import { Link } from "react-router-dom"

export const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <h1>Växla Upp</h1>
                <div className="nav-shell">
                    <p className="nav-label">Meny</p>
                    <nav>
                        <Link to="/">Hem</Link>
                        <Link to="/login">Logga in</Link>
                        <Link to="/register">Skapa konto</Link>
                        <Link to="/simulator">Jämför köp</Link>
                        <Link to="/learn">Guider</Link>
                        <Link to="/dashboard">Översikt</Link>
                        <Link to="/debts">Mina skulder</Link>

                    </nav>
                </div>
            </header>
            <main>{children}</main>
        </div>
    )
}