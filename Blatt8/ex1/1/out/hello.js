"use strict";
class X {
    constructor(newA, newB) {
        this._b = ["aa", "bb"];
        this._a = newA;
        this._b = newB;
    }
    get a() { return this._a; }
    set a(newA) { this._a = newA; }
}
let x = new X(1, ["dd", "ee"]);
let y = x.a;
console.log(y);