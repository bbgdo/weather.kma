import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "@/pages/LoginPage"
import { Dashboard } from "@/pages/Dashboard"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { StrictMode } from 'react'

const App = () => {
	return (
		<StrictMode>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		</StrictMode>
	)
}

export default App
