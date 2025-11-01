import { useEffect, useState } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { deleteCookie } from "@/utils/cookies"
import { fetchWeatherData, getWeatherLabel, type WeatherDay } from "@/utils/fetch-weather"

import Sunny from "@/assets/Sunny.svg"
import PartlyCloudy from "@/assets/PartlyCloudy.svg"
import Cloudy from "@/assets/Cloudy.svg"
import Rainy from "@/assets/Rainy.svg"
import Snowy from "@/assets/Snowy.svg"
import RainThunder from "@/assets/RainThunder.svg"

const WEATHER_IMAGES: Record<string, string> = {
	Sunny,
	"Partly cloudy": PartlyCloudy,
	Cloudy,
	Drizzle: Rainy,
	Rain: Rainy,
	Snow: Snowy,
	Thunderstorm: RainThunder,
	Fog: Cloudy,
	Unknown: PartlyCloudy,
}

export const Dashboard = () => {
	const [data, setData] = useState<WeatherDay[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadWeather = async () => {
			setLoading(true)
			const days = await fetchWeatherData()
			console.log("weather codes:", days.map(d => d.weatherCode))
			console.log("labels:", days.map(d => getWeatherLabel(d.weatherCode)))
			setData(days)
			setLoading(false)
		}
		loadWeather()
	}, [])

	if (loading) return <p className="text-center mt-10">..loading.</p>

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-semibold">Weather in Kyiv</h1>
				<Button
					variant="outline"
					onClick={() => {
						deleteCookie("session")
						window.location.href = "/login"
					}}
				>
					Log out
				</Button>
			</div>

			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-16">
				{data.map((d) => {
					const label = getWeatherLabel(d.weatherCode)
					const image = WEATHER_IMAGES[label] || Sunny

					return (
						<Card key={d.date} className="text-center bg-gray-300">
							<CardHeader>
								<CardTitle>{d.weekday}</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col items-center gap-2">
								<img src={image} alt={label} className="h-16 w-16" />
								<p className="text-sm text-gray-600">{label}</p>
								<p className="font-semibold">
									{d.tempMax}° / {d.tempMin}°
								</p>
								<p className="text-sm text-blue-500">
									Rain: {d.rainChance ?? 0}%
								</p>
							</CardContent>
						</Card>
					)
				})}
			</div>
		</div>
	)
}
