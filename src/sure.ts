export type JsonValue = string | number | Object | Array<any> | boolean | null

export class Pair {
    key: string
    value: any

    constructor(k: string, v: any) {
        this.key = k
        this.value = v
    }
}

export enum ScanStates {
    scanString = 'beginString',
    scanNumber = 'scanNumber',
    beginObject = 'beginObject',
    beginArray = 'beginArray',
    scanBoolean = 'scanBoolean',
    scanNull = 'scanNull',
    endObject = 'endObject',
    endArray = 'endArray',
    endScan = 'endScan',
    skip = 'skip',
}

export enum ScanErrors {

}