import moment from "moment";
import amountGlucoseAge from "../amountGlucoseAge";
export const countAge = (date) => {
  const age = moment().diff(date, 'years', true);
  return age;

  /*
  var a = moment([2008, 9]);
  var b = moment([2007, 0]);
  a.diff(b, 'years');       // 1
  a.diff(b, 'years', true); // 1.75
  return 15;
  */
}

export const getAmountGlucoseByAge = age => {
  return new Promise((resolve, reject) => {
    let tempItem;
    if (age > 60) {
      resolve({
        minAge: 60,
        maxAge: '~',
        amountMin: 26,
        amountMax: 51,
      });
    } else {
      amountGlucoseAge.forEach(item => {
        if (age >= item.minAge && age <= item.maxAge) {
          tempItem = item;
        }
      });
      resolve(tempItem);

    }

  });

}