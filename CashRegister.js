function checkCashRegister(price, cash, cid) {
  let funds=0.0, surplus=cash-price, refund=[];
  const coins = [["ONE HUNDRED", 100],["TWENTY", 20],["TEN", 10],["FIVE", 5],["ONE", 1],["QUARTER", 0.25],["DIME", 0.1],["NICKEL", 0.05],["PENNY", 0.01]];
	for (var i = 0; i < 9; i++) funds += cid[i][1];
  if(funds>surplus){
    for (var i = 0; i < 9; i++){
      var payment=0.0;
      while (surplus >= coins[i][1]) {
        if (cid[(cid.length - 1) - i][1] == 0) break;
        payment += coins[i][1];
        surplus = surplus.toFixed(2);
        surplus -= coins[i][1];
        cid[8 - i][1] -= coins[i][1];
      }
      if (payment != 0)refund.push([coins[i][0], payment]);
    }
    funds=0;
    for (var i = 0; i < refund.length; i++) funds += cid[i][1];
    if (funds < surplus) return { status: "INSUFFICIENT_FUNDS", change: [] };
    return { status: "OPEN", change: refund };
  }else if (funds < surplus)return { status: "INSUFFICIENT_FUNDS", change: [] };
  return { status: "CLOSED", change: cid };
}
