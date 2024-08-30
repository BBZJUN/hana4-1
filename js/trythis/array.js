'use strict';
const assert = require('assert');

let arr = [1, 2, 3, 4];
const push = (arr, ...args) => [...arr, ...args];
const pop1 = (arr, idx = 1) =>
  idx === -1 ? arr.slice(-idx)[0] : arr.slice(idx);

var ret;
const pop2 = (arr, idx = 1) => (
  (ret = arr.slice(-idx)), idx === 1 ? ret[0] : ret
);

const pop = (arr, idx = 1) => {
  const result = arr.slice(-idx);
  if (result.length === 1) return result[0];
  return result;
};

const unshift = (arr, ...args) => [...args, ...arr];

const shift = (arr, idx = 1) => arr.slice(idx);
const shift2 = (arr, idx = 1) => [arr.slice(0, idx), arr.slice(idx)];

assert.deepStrictEqual(push(arr, 5, 6), [1, 2, 3, 4, 5, 6]);
// console.log(pop(arr), pop(arr, 2));
assert.deepStrictEqual(pop(arr), 4);
assert.deepStrictEqual(pop(arr, 2), [3, 4]); // 2개 팝(꺼내 줘)!
assert.deepStrictEqual(unshift(arr, 0), [0, 1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr, 7, 8), [7, 8, 1, 2, 3, 4]);
assert.deepStrictEqual(shift(arr), [2, 3, 4]);
assert.deepStrictEqual(shift(arr, 2), [3, 4]);
const [shifted, rest] = shift2(arr);
assert.deepStrictEqual(shifted, [1]);
assert.deepStrictEqual(rest, [2, 3, 4]);
assert.deepStrictEqual(shift2(arr, 2), [
  [1, 2],
  [3, 4],
]);
assert.deepStrictEqual(arr, [1, 2, 3, 4]);

// -------------------------
// const deleteArray = (arr, start, end = Infinity) =>
//   arr.filter((a, i) => i < start || i >= end);

const deleteArray = (arr, start, end = Infinity) => {
  if (typeof start === 'number')
    return arr.filter((a, i) => i < start || i >= end);

  return arr.filter(a => a[start] !== end);
};

assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]);
assert.deepStrictEqual(arr, [1, 2, 3, 4]);
const Hong = { id: 1, name: 'Hong' };
const Kim = { id: 2, name: 'Kim' };
const Lee = { id: 3, name: 'Lee' };
let users = [Hong, Kim, Lee];

assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'id', 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'name', 'Lee'), [Hong, Kim]);

// ------------------

const hong = { id: 1, name: 'Hong' };
const choi = { id: 5, name: 'Choi' };
const kim = { id: 2, name: 'kim' };
const lee = { id: 3, name: 'Lee' };
const park = { id: 4, name: 'Park' };
users = [kim, lee, park]; // 오염되면 안됨!!

users.addUser = function (newer) {
  return [...this, newer];
};

users.removeUser = function (toRemoveUser) {
  return this.filter(user => user.id !== toRemoveUser.id);
};

users.changeUser = function (fromUser, toUser) {
  return users.map(user => (user.id === fromUser.id ? toUser : user));
};

['addUser', 'removeUser', 'changeUser'].forEach(fn =>
  Object.defineProperty(users, fn, {
    enumerable: false,
  })
);
// Object.defineProperty(users, 'addUser', {
//   enumerable: false,
// });

users.addUser(hong); // [kim, lee, park, hong]
users.removeUser(lee); // [kim, park]
users.changeUser(kim, choi); // [choi, lee, park]

assert.deepStrictEqual(users.addUser(hong), [kim, lee, park, hong]);
assert.deepStrictEqual(users, [kim, lee, park]);

assert.deepStrictEqual(users.removeUser(lee), [kim, park]);
assert.deepStrictEqual(users, [kim, lee, park]);

users.changeUser(kim, choi);
assert.deepStrictEqual(users.changeUser(kim, choi), [choi, lee, park]);
assert.deepStrictEqual(users, [kim, lee, park]);

// ---------------------------
arr = [1, 2, 3, true];
const ret1 = arr.map(String);
assert.deepStrictEqual(ret1, ['1', '2', '3', 'true']);
const classNames1 = (...args) =>
  args.reduce((acc, a) => `${acc}${acc && a ? ' ' : ''}${a ? a : ''}`, '');
const classNames2 = (...args) => args.filter(Boolean).join(' ');
const classNames = (...args) =>
  args
    .map(a => a.trim())
    .filter(Boolean)
    .join(' ')
    .replace(/\s{2,}/g, ' ');
// .replaceAll('  ', ' ');

const ret2 = classNames('', ' a  b    c ', ' d', ' ', 'e'); // cf. clsx
console.log('🚀  ret2:', ret2);
assert.strictEqual(ret2, 'a b c d e');
