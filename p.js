Object.prototype.mycall = function() {
    for (let key of this){
        console.log(this[key])
    }
}

ob = {
    1: "a",
    2: "b",
}

console.log(ob.mycall)