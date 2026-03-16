import { Routes, Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Simulator } from "../pages/Simulator"
import { Learn } from "../pages/Learn"
import { Dashboard } from "../pages/Dashboard"
import { Debts } from "../pages/Debts"
import { DebtDetail } from "../pages/DebtDetail"


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/debts" element={<Debts />} />
            <Route path="/debts/:id" element={<DebtDetail />} />

        </Routes>
    )
}