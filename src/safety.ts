import { decode } from "./decode";

type Result<T> = {ok: true, data: T} | {ok: false, error: string}

/* 
    I have to have these functions because you cannot
    construct types like you can classes
*/
function ok<T>(result: T): Result<T> {
    // `data` has our typed data
    return {ok: true, data: result}
}

function err<T>(error: string): Result<T> {
    return {ok: false, error: error}
}

class Decoder<T> {
    private decode: (json: any) => Result<T>
    readonly type: T

    constructor(decodingFn: (json: any) => Result<T>) {
        this.decode = decodingFn
    }

    run(json: any): Result<T> {
        return this.decode(json)
    }
}

function checkPrimative<T>(data: any, type: 'string' | 'number' | 'boolean', error: string): Result<T> {
    if (typeof data === type) {
        return ok<T>(data)
    } else {
        return err<T>(error)
    }
}

function checkNull(data: any): Result<null> {
    if (data === null) {
        return ok<null>(data)
    } else {
        return err<null>("could not safely decode to null")
    }
}

const Null: Decoder<null> = new Decoder<null>(
    (json: any) => {
        return checkNull(json)
    }
)

const String: Decoder<string> = new Decoder<string>(
    (json: any) => {
        return checkPrimative<string>(json, 'string', "cannot safely decode to string")
    }
)

const Bool: Decoder<boolean> = new Decoder<boolean>(
    (json: any) => {
        return checkPrimative<boolean>(json, 'boolean', "cannot safely decode to boolean")
    }
)

const Number: Decoder<number> = new Decoder<number>(
    (json: any) => {
        return checkPrimative<number>(json, 'number', "cannot safely decode to number")
    }
)