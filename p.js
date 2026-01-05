

Object.prototype.mycall = function() {
    for (let key in this){
        if(this.hasOwnProperty(key)){
            console.log(this[key])
        }
    }
}

ob = {
    1: "a",
    2: "b",
}

ob.mycall()

//Array.prototype.mymap = function(fn){
  //  let arr = [];
    //this.forEach((item)=> arr.push(fn(item)))
    //return arr
//}

//Array.prototype.myfill = function(fn){

  //   let arr = [];
    //this.forEach((item) => {if(fn(item)){arr.push(item)}} )
    //return arr;
   
//}

Array.prototype.myreduce = function(initv, fn){

    const sindex = initv !== initv ? 1:this[0]
    const acc = initv !== undefined ? initv:1

    for (let i = sindex; i<this.length; i++ ){
        const acc = fn(acc, this[i], i, this)
    }
    return acc
}

Array.prototype.myR = function(initv, fn){

    let startindex = initv !== undefined ? 0:1
    let acc = initv !== undefined ? initv:this[0]

    for(let i = startindex; i < this.length; i++){
        const acc = fn(acc, this[i], i, this) 
    }

    return acc
}

Array.prototype.Mmyr = function(initv, fn){

    let startI = initv !== undefined ? 0:1
    let acc = initv !== undefined ? initv:this[0]
    
    for(let i = startI; i < this.length; i++){
        acc = fn(acc, this[i])
    }

    return acc

}

const myflat = (arr, d = 1) => {
    let ar = [];
    
    arr.forEach((item)=>{if(Array.isArray(ar) && d>0){ar.push(myflat(...item, d-1))}
    else{ar.push(item)}
    });

    return ar;
}