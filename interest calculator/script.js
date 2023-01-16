const FORM = document.getElementsByTagName('form')[0],
INTEREST_TYPE = document.getElementById('interest-type'),
PRINCIPAL = document.getElementById('principal'),
RATE_OF_INTEREST = document.getElementById('rate-of-interest'),
PERIOD_TYPE = document.getElementById('period-type'),
PERIOD = document.getElementById('time-period'),
INTEREST = document.getElementById('interest'),
AMOUNT = document.getElementById('amount'),
COMPOUND_RATE = document.getElementById('compound-frequency');

var SI = simpleInterest(
   PRINCIPAL.value, RATE_OF_INTEREST.value,
   PERIOD_TYPE.value, PERIOD.value,
   COMPOUND_RATE.value
);
INTEREST.value = SI.interest;
AMOUNT.value = SI.amount;

PRINCIPAL.oninput = ()=> {
   SI = simpleInterest(
      PRINCIPAL.value, RATE_OF_INTEREST.value,
      PERIOD_TYPE.value, PERIOD.value,
      COMPOUND_RATE.value
   );
   INTEREST.value = SI.interest;
   AMOUNT.value = SI.amount;
}
RATE_OF_INTEREST.oninput = ()=> {
   SI = simpleInterest(
      PRINCIPAL.value, RATE_OF_INTEREST.value,
      PERIOD_TYPE.value, PERIOD.value,
      COMPOUND_RATE.value
   );
   INTEREST.value = SI.interest;
   AMOUNT.value = SI.amount;
}
PERIOD_TYPE.onchange = ()=> {
   SI = simpleInterest(
      PRINCIPAL.value, RATE_OF_INTEREST.value,
      PERIOD_TYPE.value, PERIOD.value,
      COMPOUND_RATE.value
   );
   INTEREST.value = SI.interest;
   AMOUNT.value = SI.amount;
}
PERIOD.oninput = ()=> {
   SI = simpleInterest(
      PRINCIPAL.value, RATE_OF_INTEREST.value,
      PERIOD_TYPE.value, PERIOD.value,
      COMPOUND_RATE.value
   );
   INTEREST.value = SI.interest;
   AMOUNT.value = SI.amount;
}
INTEREST_TYPE.onchange = function () {
   if (INTEREST_TYPE.value == 'ci')
      document.getElementById('label-compound-frequency').style.display = 'block';
   else
      document.getElementById('label-compound-frequency').style.display = 'none';
   SI = simpleInterest(
      PRINCIPAL.value, RATE_OF_INTEREST.value,
      PERIOD_TYPE.value, PERIOD.value,
      COMPOUND_RATE.value
   );
   INTEREST.value = SI.interest;
   AMOUNT.value = SI.amount;
}
function simpleInterest(P, n, type, t, r) {
   let inst, amt, temp_inst, temp_amt;
   if (INTEREST_TYPE.value == 'si') {
      inst = (P*(n/100)*(type*1*t)).toString();
      amt = (P*1 + inst*1).toString();
   }
   else {
      amt = (P*1*Math.pow((1+n*1/(r*1*100)), r*1*t*type*1)).toString();
      inst = (amt*1 - P*1).toString();
   }
   if (inst.indexOf('.') != -1) 
      temp_inst = inst.substring(0, inst.indexOf('.')) + inst.substr(inst.indexOf('.'), 3);
   else
      temp_inst = inst + '.00';
   if (amt.indexOf('.') != -1) 
      temp_amt = amt.substring(0, amt.indexOf('.')) + amt.substr(amt.indexOf('.'), 3);
   else
      temp_amt = amt + '.00';
   if (temp_inst.substring(temp_inst.indexOf('.'), temp_inst.length).length <= 2)
      temp_inst += '0';
   if (temp_amt.substring(temp_amt.indexOf('.'), temp_amt.length).length <= 2)
      temp_amt += '0';
   return {
      interest: temp_inst,
      amount: temp_amt
   }
}

FORM.style.margin = window.innerHeight / 2 - FORM.offsetHeight / 2 + 'px auto';
