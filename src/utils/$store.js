import { cachePrefix } from '@/config'

export default {
    setItem(key, val) {
        try {
            localStorage.setItem(cachePrefix + key, JSON.stringify(val))
        } catch (err) {
            console.error(err)
        }
    },

    getItem(key) {
        const val = localStorage.getItem(cachePrefix + key)
        if (!val) return null
        try {
            return JSON.parse(val)
        } catch (err) {
            return null
        }
    },

    delItem(key) {
        localStorage.removeItem(cachePrefix + key)
    },

    clearAll() {
        localStorage.clear()
    }
}
