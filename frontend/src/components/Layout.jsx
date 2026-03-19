import { Link } from "react-router-dom"
import { useState } from "react"

export const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const shouldShowMenu = isMenuOpen || window.innerWidth >= 480

    return (
        <div>
            <header>
                <h1>Växla Upp</h1>
                <div className="nav-shell">
                    <p className="nav-label mobile-only">Meny</p>
                    <button
                        className="menu-toggle mobile-only"
                        aria-label="Öppna meny"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span className="menu-icon" aria-hidden="true"></span>
                    </button>
                    {shouldShowMenu && (
                        <nav>
                            <Link to="/">Hem</Link>
                            <Link to="/login">Logga in</Link>
                            <Link to="/register">Skapa konto</Link>
                            <Link to="/simulator">Jämför köp</Link>
                            <Link to="/learn">Guider</Link>
                            <Link to="/dashboard">Översikt</Link>
                            <Link to="/debts">Mina skulder</Link>

                        </nav>
                    )}
                </div>
            </header>
            <main>{children}</main>
        </div>
    )
}