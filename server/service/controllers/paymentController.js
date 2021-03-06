const { User, Balance } = require('../models');
const midtransClient = require('midtrans-client');
// Create Snap API instance
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-wbLcGSE8HpMB_os5vYzbrJgT',
  clientKey: 'SB-Mid-client-PWi2oSB5f0ZMGyhH',
});

class ControllerPayment {
  static async transaction(req, res, next) {
    try {
      // const { id, email } = req.loginfo;
      const { addAmount } = req.body;
      const transactionCode = `TRX${Math.floor(Math.random() * 1000000)}`;

      let parameter = {
        transaction_details: {
          order_id: `${Date.now()}-${transactionCode}`,
          gross_amount: String(addAmount),
        },
      };

      const transaction = await snap.createTransaction(parameter);


      let transactionToken = transaction.token;
      console.log('transactionToken:', transactionToken);

      let transactionRedirectUrl = transaction.redirect_url;
      console.log('transactionRedirectUrl:', transactionRedirectUrl);

      res.status(200).json({
        token: transactionToken,
        redirect_url: transactionRedirectUrl,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addBalance(req, res, next) {
    try {
      const { id } = req.loginfo; //ambil id dari authentication
      const { addAmount } = req.body; //ambil amount dari body
      console.log(addAmount, '<<<<<<<< addAmount');

      // const { userId } = req.params;
      const BalanceCheck = await Balance.findOne({
        where: {
          UserId: id,
        },
      });
      if (!BalanceCheck) {
        let balanceCreate = await Balance.create({
          UserId: id,
          amount: addAmount,
        });
      } else {
        let balanceUpdate = await Balance.update(
          {
            amount: Number(BalanceCheck.amount) + Number(addAmount),
          },
          {
            where: {
              UserId: id,
            },
          }
        );
      }
      res.status(200).json({
        message: 'Topup Success',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerPayment;
