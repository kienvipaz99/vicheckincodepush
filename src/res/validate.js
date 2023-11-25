export function isRequired(str = '') {
  if (str !== null) {
    return !(str.trim().length === 0);
  }
  return false;
}
export function checkmang(str) {
  if (str.length > 0) {
    return true;
  }
  return false;
}
export function checkdatatime(str) {
  if (str == undefined) {
    return false;
  }
  return true;
}
export function itemcheck(val, err) {
  if (val == err) {
    return false;
  } else {
    return (a = true);
  }
}
export function checkNumberPhone(val) {
  let check = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  if (val.match(check)) {
    return true;
  }
  return false;
}
export function convert(number) {
  let check = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  return check;
}

export function validateEmail(email) {
  let aaa = email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  if (aaa) {
    return true;
  }
  return false;
}
