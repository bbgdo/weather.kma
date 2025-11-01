export const setCookie = (name: string, value: string, days = 1) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

export const getCookie = (name: string) => {
    return document.cookie.split("; ").reduce((r, c) => {
        const [k, v] = c.split("=")
        return k === name ? decodeURIComponent(v) : r
    }, "")
}

export const deleteCookie = (name: string)=> {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}
