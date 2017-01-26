const Node = require('./node');

class LinkedList {
  constructor() {
    this.length = 0;
    this._head = null;
    this._tail = null;
  }

  append(data) {
    const newNode = new Node(data);

    if (this.length) {
      this._tail.next = newNode;
      newNode.prev = this._tail;
      this._tail = newNode;
    } else {
      this._head = newNode;
      this._tail = newNode;
    }

    this.length++;

    return this;
  }

  head() {
    return this._head ? this._head.data : null;
  }

  tail() {
    return this._tail ? this._tail.data : null;
  }

  find(index){
    if (index < this.length && index >= 0) {
      let currentNode = this._head;

      for(let i = 0; i < index; i++){
        currentNode = currentNode.next;
      }

      return currentNode;
    } else {
      throw new Error('Could not find an item on the list. The incorrect index was given.')
    }
  }

  at(index) {
    return this.find(index).data;
  }

  insertAt(index, data) {
    if (!this.length) {
      return this.append(data);
    }

    const newNode = new Node(data);
    const currentNode = this.find(index);

    newNode.next = currentNode;
    newNode.prev = currentNode.prev;

    if (currentNode.prev) {
      currentNode.prev.next = newNode;
    }

    currentNode.prev = newNode;

    this.length++;

    return this;
  }

  isEmpty() {
    return !this.length
  }

  clear() {
    this._head = null;
    this._tail = null;
    this.length = 0;

    return this;
  }

  deleteAt(index) {
    if (this.length === 1) {
       return this.clear();
    }
    const currentNode = this.find(index);

    currentNode.prev.next = currentNode.next;
    currentNode.next.prev = currentNode.prev;
    this.length--;

    return this;
  }

  reverse() {
    let bufferNode = new Node(),
        nodeHead = this._head,
        nodeTail = this._tail;

    for(let i = 0,len = Math.floor(this.length / 2); i < len; i++) {
      bufferNode.data = nodeTail.data;
      nodeTail.data = nodeHead.data;
      nodeHead.data = bufferNode.data;

      nodeHead = nodeHead.next;
      nodeTail = nodeTail.prev;
    }

    return this;
  }

  indexOf(data) {
    let currentNode = this._head;

    for(let i = 0; i < this.length; i++) {
      if (currentNode.data === data) return i;

      currentNode = currentNode.next;
    }

    return -1;
  }
}

module.exports = LinkedList;
