import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

export const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isLoggedIn } = useContext(AuthContext)

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
                            {!isLoggedIn && <Link to="/">Hem</Link>}
                            {isLoggedIn && <Link to="/dashboard">Översikt</Link>}
                            {isLoggedIn && <Link to="/debts">Mina skulder</Link>}
                            <Link to="/simulator">Jämför köp</Link>
                            <Link to="/learn">Guider</Link>
                            {!isLoggedIn && <Link to="/login">Logga in</Link>}
                            {!isLoggedIn && <Link to="/register">Skapa konto</Link>}



                        </nav>
                    )}
                </div>
            </header>
            <main>{children}</main>
        </div>
    )
}