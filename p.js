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

Array.prototype.map = function(fn){
    let arr = [];
    this.forEach((item)=> arr.push(fn(item)))
    return arr
}