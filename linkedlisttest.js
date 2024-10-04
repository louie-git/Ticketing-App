class Node {
	constructor(value){
		this.value = value;
		this.next = null
	}
}

class LinkedList {
	constructor(value){
		this.head=null
		this.size = 0
	}



  remove(value){
    if(this.isEmpty()) console.log('Nothing to delete')
    else {
      let curr = this.head
      let temp = curr.next
      if(curr.value == value){
        this.head = temp
        return
      }
      else {
        while(curr){
          console.log(curr.next)
          if(value === temp.value){
            curr.next = temp.next
            return
          }
          else {
            curr = curr.next
            temp = curr.next
          }
        }
      }
    }
  }

  insert(value, insertTo){
    let node = new Node(value)
    if(this.isEmpty()) this.head = node
    else {

      let curr = this.head
      while(curr){
        if(curr.value === insertTo){
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
	
	prepend(value){
		
		let node = new Node(value)
    
    if(this.isEmpty()) this.head = node
    let curr = this.head
    node.next = curr
    this.head = node
    
	}
	
	isEmpty(){
		return this.size === 0
	}
	
	getSize(){
		return this.size
	}
	
	append(value){
		let node = new Node(value)
		
		if(this.isEmpty()) {
			this.head = node
		}
		else {
			
			let curr = this.head
      console.log(curr)
			while(curr){
				if(curr.next == null){
					curr.next = node
          return
				}
				else {
					curr = curr.next
				}
			}
		}
		this.size++
	}
	
	print(){
		let curr = this.head
		let strText = ''
		while(curr) {
			strText += `${curr.value} `
			curr = curr.next
		}
		return strText
	}
}


let list = new LinkedList()

list.append(10)
list.append(20)
list.append(30)
console.log(list.getSize())
console.log(list.print())
list.prepend(40)
console.log(list.print())
list.insert(50,10)
console.log(list.print())
list.remove(40)
console.log(list.isEmpty())
console.log('dele',list.print())


