/*
type jsv = {kind: 'JsNull'}
    | {kind: 'JsBool', value: boolean}
    | {kind: 'JsString', value: string}
    | {kind: 'JsNumber', asFloat: boolean, value: number}
    | {kind: 'JsArray', value: Array<jsv>}
    | {kind: 'JsObject', value: { [key: string]: jsv }}

type JSNull = null
type JSNumber = number
type JSString = string
type JSBool = boolean

type JSVal = JSNull | JSNumber | JSString | JSBool | JSArray | JSObject

interface JSArray extends Array<JSVal> {}

interface JSObject {
    [key: string]: JSVal
}
*/

class JSVal {
    v: any
    constructor(v: any) {}
}

class JSNull extends JSVal {}

class JSNumber extends JSVal {}

class JSString extends JSVal {
    toString(): string {
        return this.v
    }
}

class JSBool extends JSVal {}

interface JSArray extends Array<JSVal> {}

interface JSObject extends Object{
    [key: string]: JSVal
}

export {
    JSNull, JSNumber, JSString, JSBool, JSVal, JSArray, JSObject
}