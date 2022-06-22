const finalPrice = require("../helpers/helperFinalPrice")
const ExpoToken = require("../redisconfig/redismodel")


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
describe("Redis Test", () => {
    test('Redis Get data testing set token', async () => {
        const result = await ExpoToken.setToken(999999, 'ExponentPushToken[PkSS6NDnv0yZ1YPneQIqbz]')
        expect(result).toEqual(expect.any(Object));
        expect(result.tokenAssigned).toEqual(true);
    })
})

