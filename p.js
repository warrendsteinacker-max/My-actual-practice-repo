

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
    
    arr.forEach((item)=>{if(Array.isArray(item) && d>0){ar.push(...myflat(item, d-1))}
    else{ar.push(item)}
    });

    return ar;
}

const debounce = (fn, d) => {

let timer;

return function(...args) {

if(timer){

    clearTimeout(timer)
} 

timer = setTimeout(() => {fn.apply(this, args)}, d)

}

}

const throt = (fn, d) => {

let timer;

return function(...args){
    if(timer){return null}
    timer = true

    setTimeout(()=> {fn.apply(this, args); timer = false }, d)
}

}

///

const once = (fn, context) => {

    let ran;

    return function(...args){
      

      if(fn){
        ran = fn.apply(this || context, args)
        fn = null

      }
      return ran
    }
    
}


const memo = (fn, context) => {

    let cach = {};

    return function(...args){

       let cachc = JSON.stringify(args)
       if(!cach[cachc]){

       return cach[cachc] = fn.call(this || context, ...args)

       } 
       else{
        return cach[cachc]
       }

    }
}






const CC = (fn, context) => {

    return function Cc(...args){

        if(args.length >= fn.length){

            return fn(...args)
        }else{

            return function(...next){
                return Cc(...args, ...next)
            }
        }



    }


}

const mem = (fn, context) => {
let ca = {};
return function(...args){
    let caa = JSON.stringify(args)
    if(!ca[caa]){
       return ca[caa] = fn.call(this || context, ...args)
    } 
    else{
        return ca[caa]
    }
}
}


////

Function.prototype.myB = function(context = {}, ...args) {
    if(typeof this !== "function"){
        throw new Error("not func")
    }

    context.fn = this 
    return function (...next){
        return context.fn.call(context, ...args, ...next)
    }
}


Function.prototype.myB = function(context = {}, ...args){
    if(typeof this !== "function"){
        throw new Error("w")
    }
    context.fn = this
    return function(...next){
        return context.fn.call(context, ...args, ...next)
    }
}

Function.prototype.myC = function(context = {}, ...args){

    if(typeof this !== "function"){
        throw new Error("q")
    }

    context.fn = this 
    return context.fn(...args) 

}