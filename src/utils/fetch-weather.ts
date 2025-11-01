export interface WeatherDay {
	date: string
	weekday: string
	tempMax: number
	tempMin: number
	rainChance: number
	weatherCode: number
}

export const fetchWeatherData = async (): Promise<WeatherDay[]> => {
	const res = await fetch(
		"https://api.open-meteo.com/v1/forecast?latitude=50.4424&longitude=30.5025&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=Europe%2FBerlin"
	)
	const json = await res.json()

	return json.daily.time.slice(0, 5).map((t: string, i: number) => {
		const d = new Date(t)
		return {
			date: t,
			weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
			tempMax: json.daily.temperature_2m_max[i],
			tempMin: json.daily.temperature_2m_min[i],
			rainChance: json.daily.precipitation_probability_max[i],
			weatherCode: Number(json.daily.weathercode[i]),
		}
	})
}

export const getWeatherLabel = (code: number): string => {
	const c = Number(code)

	if (c === 0 || c === 1) return "Sunny"
	if (c === 2) return "Partly cloudy"
	if (c === 3) return "Cloudy"
	if (c === 45 || c === 48) return "Fog"
	if ([51, 53, 55, 56, 57].includes(c)) return "Drizzle"
	if ([61, 63, 65, 80, 81, 82].includes(c)) return "Rain"
	if ([66, 67].includes(c)) return "Rain"
	if ([71, 73, 75, 77, 85, 86].includes(c)) return "Snow"
	if ([95, 96, 99].includes(c)) return "Thunderstorm"

	return "Unknown"
}
