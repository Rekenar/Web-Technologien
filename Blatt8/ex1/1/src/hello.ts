class X {
	private _a: number;
	private _b: string[] = ["aa", "bb"];
	constructor (newA: number, newB: string[]) {
		 this._a = newA;
		 this._b = newB;
	}
	public get a(): number { return this._a; }
	public set a(newA: number) { this._a = newA; }
}

let x: X = new X(1, ["dd", "ee"]);
let y: number = x.a;
console.log(y);