const finalPrice = require("../helpers/helperFinalPrice")

describe("finalPrice Test", () => {
    test('should first', () => { 
        const result = finalPrice(10.000, 100)
        expect(result).toEqual(expect.any(Object));
        expect(result.targetQuantity).toEqual(10);
        expect(result.totalProductPrice).toEqual(3000107);
    })
})