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

type JSVal = string | number | boolean | JSObject | JSArray

interface JSObject {
    [key: string]: JSVal
}

interface JSArray extends Array<JSVal> {}

type JSVal = JSObject | boolean | null | number | string | JSArray<JSObject | number | string | boolean | null>

interface JSArray<T> {
    [i: number]: T | JSArray<T>
}

interface JSObject {
    [key: string]: JSVal
}

type JsNull = null
type JsString = string
type JsNumber = number
type JsBool = boolean
interface JsArray extends Array<JsNull | JsString | JsBool | JsNumber> {}
interface JsObject {
    [key: string]: JsNull | JsString | JsNumber | JsBool | JsArray | JsObject
}

let t: JsObject = {'a': 1}
t.hasOwnProperty('a')

export {
    JSVal, JSObject, JSArray
}

*/

