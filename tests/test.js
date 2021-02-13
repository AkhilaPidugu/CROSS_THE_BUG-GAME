var score = 0;

describe("Score incrementing", () => {

    beforeEach(() => {
        score += 100;
    });
    it("should increase by 100", () => {
        expect(score).toBe(100);
    });

});

var sc = 100;
describe("Score decrementing", () => {

    beforeEach(() => {
        sc -= 50;
    });
    it("should decrease by 50", () => {
        expect(sc).toBe(50);
    });

});