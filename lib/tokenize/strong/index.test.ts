import * as index from "./index"
// @ponicode
describe("index.default", () => {
    test("0", () => {
        let callFunction: any = () => {
            index.default({ now: () => ({ line: -1, column: -5.48, offset: 1 }) }, "Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            index.default({ now: () => ({ line: -100, column: 0, offset: 0 }) }, "elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            index.default({ now: () => ({ line: 1, column: 100, offset: 1 }) }, "Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            index.default({ now: () => ({ line: 100, column: 100, offset: 4 }) }, "Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            index.default({ now: () => ({ line: 100, column: 0, offset: 0 }) }, "Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            index.default({ now: () => ({ line: Infinity, column: Infinity, offset: Infinity }) }, "")
        }
    
        expect(callFunction).not.toThrow()
    })
})
