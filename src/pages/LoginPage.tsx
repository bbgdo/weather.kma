import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { setCookie } from "@/utils/cookies"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const LoginPage = () => {
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (login === "mark5" && password === "mark5") {
			const token = Math.random().toString(36).substring(2)
			setCookie("session", token, 1)
			navigate("/dashboard")
		} else {
			setError("wrong login or password!")
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<Card className="w-[420px] shadow-xl p-4">
				<CardHeader>
					<CardTitle className="text-center text-2xl font-bold tracking-wide">weather.kma</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="flex flex-col gap-5">
						<Input
							placeholder="login"
							value={login}
							onChange={(e) => setLogin(e.target.value)}
							className="h-12 text-lg px-4"
						/>
						<Input
							type="password"
							placeholder="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="h-12 text-lg px-4"
						/>
						{error && <p className="text-base text-red-500 text-center">{error}</p>}
						<Button type="submit" className="h-12 text-lg font-semibold w-full">
							log in
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
