import {expect} from "chai";
import {toFixed} from "../../src/helpers/toFixed";

describe("toFixed()", () => {

    it("should return `00` when Number(0) if precision equals 2", () => {
        expect(toFixed(2, 0)).to.equal("00");
    });

    it("should return `000` when Number(0) if precision equals 3", () => {
        expect(toFixed(3, 0)).to.equal("000");
    });

    it("should return undefined if precision less than 0", () => {
        expect(toFixed(-1, 0)).to.equal(undefined);
    });

});
