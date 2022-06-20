const finalPrice = (initialPrice, weightProduct) => {
  const targetQuantity = Math.ceil(1000 / weightProduct)
  const freeOnBoard = initialPrice * targetQuantity
  const fixCost = 3000000
  let profitAdmin

  if (freeOnBoard < 100000000 ) {
    profitAdmin = freeOnBoard * 7 / 100
  } else if (freeOnBoard >= 100000000 && freeOnBoard < 500000000 ) {
    profitAdmin = freeOnBoard * 5 / 100
  } else {
    profitAdmin = freeOnBoard * 3 / 100
  }

  const totalProductPrice = freeOnBoard + fixCost + profitAdmin

  return {
    targetQuantity,
    totalProductPrice,
  }
};

module.exports = finalPrice;
