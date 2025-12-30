//Challenge: Create a constructor function Book that takes title and author. Then, add a method 
//getDetails to its prototype that returns a string: "Title by Author".


class B {
    constructer(a, b, c, d){
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
    geta() {console.log(this.a);}
    getb() {return this.b;}
    getc() {return this.c;}
    getd() {return this.d;}
}

const b = new B(1, 2, 3, 4);



b.geta();