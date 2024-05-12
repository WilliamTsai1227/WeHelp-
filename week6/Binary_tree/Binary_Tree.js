//目標：儲存不可重複的資料，支援新增，查詢是否存在，以及按照由小到大的排序列表功能

//解法一：使用陣列資料結構
class ArrayDB{
    constructor(){
        this.data = [];
        this.size = 0;
    }
    push(value){
        if(!this.contains(value)){
            this.size ++;
            this.data.push(value);
        }
    }
    contains(value){
        for(let i =0;i<this.data.length;i++){
            if(this.data[i] == value){
                return true;
            }
        }
        return false;
    }
    list(){
        return this.data.toSorted()
    }
}

let db = new ArrayDB();
db.push(5);
db.push(8);
db.push(6);
db.push(8);
console.log(db.size);
console.log(db.contains(8));
console.log(db.contains(7));
console.log(db.list());


//解法二：使用二元搜尋樹資料結構
//每一個資料就擺在一個節點中，節點包含一個指向左邊節點的紀錄，和一個指向右邊節點的紀錄
/*

[3,1,2,5,0]

        3
   1        5
0    2
*/
class Node{
    constructor(value, left, right){
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
class BSTDB{
    constructor(){
        this.root = null;
        this.size = 0;
    }
    push(value){
        let node = this.root;
        if(node === null){    //如果根節點為空
            this.root = new Node(value, null, null);
            this.size++;
            return;
        }
        while(true){
            if(value === node.value){
                return;
            }else if(value > node.value){  //要放的資料比較大，往右邊走
                if(node.right === null){
                    node.right = new Node(value, null, null);  //放入資料
                    this.size++;
                    break;
                }
                else{
                    node = node.right;  //往右邊走
                }
            }else{  //要放的資料比較小，往左邊走
                if(node.left === null){
                    node.left = new Node(value, null, null);  //放入資料
                    this.size++;
                    break;
                }
                else{
                    node = node.left;  //往左邊走
                }
            }
        }
    }
    contains(value){
        let node = this.root;
        if(node === null){    //如果根節點為空
            return false;
        }
        while(true){
            if(value === node.value){
                return true;
            }else if(value > node.value){  //要放的資料比較大，往右邊走
                if(node.right === null){
                    break;   //找完了都沒找到
                }
                else{
                    node = node.right;  //往右邊走
                }
            }else{  //要放的資料比較小，往左邊走
                if(node.left === null){
                    break;   //找完了都沒找到
                }
                else{
                    node = node.left;  //往左邊走
                }
            }
        }
        return false;
    }
    list(){
        let node = this.root;
        let stack = [];
        let result = [];
        while(true){
            while(node!==null){    //從跟節點一路追到最左邊
                stack.push(node)  //push 進stack ,最後一筆push的會是可以第一個pop出來的
                node = node.left;
            }
            if (stack.length === 0){
                break;
            }
            node = stack.pop();    //把最左邊，０拿出來的意思
            result.push(node.value);   //放進結果
            node = node.right;   //往右邊去
        }
        return result;
    }
}

let db2 = new BSTDB();
db2.push(5);
db2.push(8);
db2.push(6);
db2.push(8);
console.log(db2.size);
console.log(db2.contains(8));
console.log(db2.contains(7));
console.log(db2.list());