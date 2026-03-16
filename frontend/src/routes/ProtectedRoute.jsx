import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children }) => {
    const isLoggedIn = false

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    return children
}