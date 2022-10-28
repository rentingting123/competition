import { getItem, setItem, removeItem } from '@@/utils/commons'
const CCTOKEN = 'login',
    REFLASHTOKEN = 'reflash_token'

export function setToken(tk) {
    setItem(CCTOKEN, tk)
}
export function setReflashToken(rtk) {
    setItem(REFLASHTOKEN, rtk)
}
export function getToken() {
    return getItem(CCTOKEN)
}
export function getReflashToken() {
    return getItem(REFLASHTOKEN)
}

export function removeToken() {
    removeItem(CCTOKEN)
}
export function removeReflashToken() {
    removeItem(REFLASHTOKEN)
}