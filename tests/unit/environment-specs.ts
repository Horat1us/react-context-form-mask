import { expect } from "chai";
describe("require()", () => {
    const Module = require("module");
    const originalRequire = Module.prototype.require;

    beforeEach(() => {
        delete require.cache[require.resolve("../../src/Components/ReactInputMask")]

        Module.prototype.require = function () {
            return {
                ...originalRequire.apply(this, arguments),
                default: true
            }
        };
    });

    afterEach(() => {
        Module.prototype.require = originalRequire;
    })

    it("`default` property", async () => {
        const ReactInputMask = await import("../../src/Components/ReactInputMask");
        expect(ReactInputMask).to.haveOwnProperty("default");
    });
});
