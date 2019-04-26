export type JsonValue = string | number | Object | Array<any> | boolean | null

export function isValidString(s: string): boolean {
    if (s[0] === '"' && s[s.length] === '"') {
        return true
    }
    return false
}

export function isValidNumber(s: string): boolean {
    return true
}

export function dequoteString(s: string) {
    //need to remove extra quoting to avoid stuff like
    // { '"a"': '1', '"b"': '2' }
}