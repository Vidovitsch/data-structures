const DisjointSet = require('./data-structures/DisjointSet');
const Stack = require('./data-structures/Stack');
const Queue = require('./data-structures/Queue');
const Bag = require('./data-structures/Bag');
const SinglyLinkedList = require('./data-structures/SinglyLinkedList');
const DoublyLinkedList = require('./data-structures/DoublyLinkedList');

const b = new Bag();
b.add(5);
const c = new Bag();
c.add(15);
console.log(c.asArray());


module.exports = {
  DisjointSet,
  Stack,
  Queue,
  Bag,
  SinglyLinkedList,
  DoublyLinkedList,
};
