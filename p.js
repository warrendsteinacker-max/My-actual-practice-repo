import { contain } from "three/src/extras/TextureUtils.js"

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

Array.prototype.mymap = function(fn){
    let arr = [];
    this.forEach((item)=> arr.push(fn(item)))
    return arr
}

Array.prototype.myfill = function(fn){
    let arr = [];
    this.forEach((item) => {if(fn(item)){arr.push(fn(item))}} )
    return arr;
}

