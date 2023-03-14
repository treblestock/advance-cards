class DoublyLinkedList {
  first = null
  last = null
  _createNode(data) {
    return (typeof data === 'object' && 'prev' in data && 'next' in data) 
      ? data
      : ({
      data,
      prev: null,
      next: null,
    })
  }
  push(data) {
    if (!this.last) {
      this.first = this.last = this._createNode(data)
      return 
    }
    const node = this._createNode(data)
    node.prev = this.last
    this.last.next = node
    this.last = this.last.next
  }
  pop() {
    this.last = this.last.prev
  }
  unshift(data) {
    if (!this.first) {
      this.first = this.last = this._createNode(data)
      return 
    }
    const node = this._createNode(data)
    node.next = this.first
    this.first.prev = node
    this.first = this.first.prev
  }
  shift() {
    this.first = this.first.next
  }

  at(ind) {
    const isNegative = ind < 0 || Object.is(ind, -0)

    const startNode = isNegative ? 'last' : 'first'
    const furtherNodeType = isNegative ? 'prev' : 'next'
    
    let res = this[startNode]
    for (let i = 0; i < Math.abs(ind); i++) {
      res = res[furtherNodeType]
    }
    return res
  }
}

export {
  DoublyLinkedList,
}