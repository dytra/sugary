import moment from "moment";
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