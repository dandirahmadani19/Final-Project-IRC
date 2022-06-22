const finalPrice = require("../helpers/helperFinalPrice")

describe("finalPrice Test", () => {
    test('First condition final price testing', () => { 
        const result = finalPrice(10.000, 100)
        expect(result).toEqual(expect.any(Object));
        expect(result.targetQuantity).toEqual(10);
        expect(result.totalProductPrice).toEqual(3000107);
    })
    test('Second condition final price testing', () => { 
        const result = finalPrice(100000000, 100000)
        expect(result).toEqual(expect.any(Object));
        expect(result.targetQuantity).toEqual(1);
        expect(result.totalProductPrice).toEqual(108000000);
    })
})