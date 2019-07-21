const LOCALE = 'en-US'
const TIME_OPTIONS = { hour12: true, hour: '2-digit', minute: '2-digit' }
const DATE_OPTIONS = { day: 'numeric', month: 'short' }
const DATETIME_OPTIONS = { weekday: 'short', day: 'numeric', month: 'short', year: '2-digit', hour12: true, hour: '2-digit', minute: '2-digit' }

return {
	mailTime(time, now){
		if (!now) return time.toLocaleTimeString(LOCALE, DATETIME_OPTIONS)
		if (time.getFullYear() !== now.getFullYear())
			return time.toLocaleDateString()
		if (time.getMonth() === now.getMonth() && time.getDate() === now.getDate())
			return time.toLocaleTimeString(LOCALE, TIME_OPTIONS)
		return time.toLocaleDateString(LOCALE, DATE_OPTIONS)
	}
}
