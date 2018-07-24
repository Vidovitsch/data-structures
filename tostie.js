const { Stack } = require('./index');

const stack = new Stack();
stack.push(8);
stack.push(10);
stack.push(12);
console.log(stack.asArray());
