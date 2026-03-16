import { Routes, Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Simulator } from "../pages/Simulator"
import { Learn } from "../pages/Learn"
import { Dashboard } from "../pages/Dashboard"
import { Debts } from "../pages/Debts"
import { DebtDetail } from "../pages/DebtDetail"
import { ProtectedRoute } from "./ProtectedRoute"


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="/debts" element={
                <ProtectedRoute>
                    <Debts />
                </ProtectedRoute>
            } />
            <Route path="/debts/:id" element={
                <ProtectedRoute>
                    <DebtDetail />
                </ProtectedRoute>
            } />

        </Routes>
    )
}