const { parseArgs } = require('util');

const hong = { id: 1, name: 'Hong' };
const kim = { id: 2, name: 'Kim' };
const lee = { id: 3, name: 'Lee' };
const park = { id: 4, name: 'Park' };

const users = [hong, kim, lee, park];
const idxKim = users.indexOf(kim);
console.log('🚀  idxKim:', idxKim);

const find3 = a => a.id === 3;
const idxId2 = users.findIndex(find3);
console.log('🚀  idxId2:', idxId2);

// const idxId1 = users.findLastIndex(a => a.id === 3);
const idxId1 = users.findLastIndex(find3);
console.log('🚀  idxId1:', idxId1);

const findId = 
