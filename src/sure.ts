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
    beginString = 'beginString',
    beginNumber = 'beginNumber',
    beginObject = 'beginObject',
    beginObjectKey = 'beginObjectKey',
    beginObjectValue = 'beginObjectvalue',
    beginArray = 'beginArray',
    beginArrayValue = 'beginArrayValue',
    beginBoolean = 'beginBoolean',
    beginNull = 'beginNull',
    endString = 'endString',
    endObject = 'endObject',
    endObjectKey = 'endObjectKey',
    endObjectValue = 'endObjectValue',
    endArray = 'endArray',
    endArrayValue = 'endArrayValue',
    endScan = 'endScan',
    skip = 'skip',
}