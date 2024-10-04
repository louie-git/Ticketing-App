class Node {
  constructor(value){
    this.value = value;
    this. next = null
  }
}

class LinkedList {
  constructor(value){
    this.head = null
    this.size = 0
  }

  isEmpty() {
    return this.size === 0
  }

  getSize(){
    return this.size
  }

  insert(value, assignTo) {
    let node = new Node(value)
    console.log(node)
    if(this.isEmpty()){
      this.head = node
    }
    else {

      let curr = this.head

      while(curr){
        if(assignTo === curr.value){
          node.next = curr.next
          curr.next = node
          curr = curr.next
        }
        else {
          curr = curr.next
        }
      }
    }
  }

  append(value) {
    const node = new Node(value)
    if(this.isEmpty()){
      this.head = node
    }
    else {
      let curr = this.head
      while(curr){
        console.log(curr)
        if(curr.next === null) {
          curr.next = node
          return
        }
        else {
          curr=curr.next
        }
      }
    }
    this.size++

  }

  prepend(value) {
    const node = new Node(value)

    if(!this.isEmpty()) node.next = this.head
    this.head = node
    this.size++
  }

  print() {
    if(this.isEmpty()){
      console.log('list is empty')
    }
    else {
      let curr = this.head
      let listVal = ''
      
      while (curr) {
        listVal += `${curr.value} `
        curr = curr.next
      }

      return listVal
    }
  }
}

const list = new LinkedList()


list.prepend(10)
list.prepend(20)
list.prepend(30)
console.log(list.print())
list.append(40)
console.log(list.print())
list.insert(50,20)
console.log(list.print())

