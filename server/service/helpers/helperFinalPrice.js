const finalPrice = (typeProduct, priceProduct) => {
  const toUsd = 0.000067; // bisa di kasih api untuk kurs mata uang ke usd

  let freeOnBoard = priceProduct; // harga asli barang
  let freight = 300000; // ongkir tergantung jasa
  let costAndFreight = freeOnBoard + freight;
  let insurance = (costAndFreight * 0.5) / 100; // atau tergantung barang
  let costInsuranceFreight = freeOnBoard + insurance + freight;

  // bea masuk tergantung dengan besarnya FOB
  // CIF jadi base untuk hitung pajak

  let PPN = 11 / 100;
  let beaMasuk = 0 / 100;
  let PPh = 0 / 100;
  let PPnBM = 0 / 100;

  switch (typeProduct) {
    case "tas":
      beaMasuk = 20 / 100; // range 15-20%
      PPh = 10 / 100; // range 7.5-10%
      break;
    case "sepatu":
      beaMasuk = 30 / 100; // range 25-30%
      PPh = 10 / 100; // range 7.5-10%
      break;
    case "produk tekstil":
      beaMasuk = 25 / 100; // range 15-25%
      PPh = 10 / 100; // range 7.5-10%
      break;
    case "buku ilmu pengetahuan":
      beaMasuk = 0;
      PPN = 0;
      PPh = 0;
      break;
    default:
      if ((freeOnBoard / toUsd) > 3 && (freeOnBoard / toUsd) <= 1500) {
        beaMasuk = 7.5 / 100;
      } else if ((freeOnBoard / toUsd) > 1500) {
        beaMasuk = 7.5 / 100;
        PPh = 10 / 100; // range nya cukup luas tergantung jenis barang
        PPnBM = 75 / 100; // range 20-75%
      }
      break;
  }

  let importValue = costInsuranceFreight + freeOnBoard * beaMasuk;
  let ppnValue = importValue * PPN;
  let pphValue = importValue * PPh;
  let ppnbmValue = importValue * PPnBM;
  return importValue + ppnValue + pphValue + ppnbmValue;
};

console.log(finalPrice('tas', 15000000))

module.exports = finalPrice
