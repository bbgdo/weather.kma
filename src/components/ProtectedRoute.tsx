import { Navigate, Outlet } from "react-router-dom"
import { getCookie } from "@/utils/cookies"

export const ProtectedRoute = () => {
    const token = getCookie("session")
    if (!token) return <Navigate to="/login" replace />
    return <Outlet />
}
