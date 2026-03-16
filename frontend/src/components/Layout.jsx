export const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <h1>Plussidan</h1>
            </header>
            <main>{children}</main>
        </div>
    )
}