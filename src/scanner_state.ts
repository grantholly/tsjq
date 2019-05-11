import { ScanStates } from './sure'

export class ScannerState {
    state: Array<ScanStates>

    constructor() {
        this.state = []
    }

    pushState(s: ScanStates): void {
        this.state.push(s)
    }

    popState(): ScanStates {
        const s: ScanStates | undefined = this.state.pop()
        if (s === undefined) {
            return ScanStates.endScan
        }
        return s
    }

    peek(): ScanStates {
        if (this.state.length === 0) {
            return ScanStates.endScan
        }
        return this.state[this.state.length - 1]
    }

    insideCompoundType(beginState: ScanStates,
        endState: ScanStates): boolean {
        // count the number of beginStates and endStates
        // if the begins and ends are the same count or 0
        // then we are not in an array
        const openStates: number = this.state.reduce(
            (acc, cur) => {
                if (cur === beginState) {
                    acc ++
                } return acc
            }, 0)
        const closedStates: number = this.state.reduce(
            (acc, cur) => {
                if (cur === endState) {
                    acc ++
                } return acc
            }, 0)
        if (openStates + closedStates === 0) {
            return false
        }
        if (openStates === closedStates) {
            return false
        }
        return true
    }

    scanningArray(): boolean {
        return this.insideCompoundType(
            ScanStates.beginArray, ScanStates.endArray
        )
    }

    scanningObject(): boolean {
        return this.insideCompoundType(
            ScanStates.beginObject, ScanStates.endObject
        )
    }
}