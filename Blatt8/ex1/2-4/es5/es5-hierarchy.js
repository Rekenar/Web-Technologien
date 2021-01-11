class Image {
	constructor(width, height, bitdepth) {
		this.width = width;
		this.height = height;
		this.bitdepth = bitdepth;
	}
	
	rawsize() {
		return (this.width * this.height * this.bitdepth) / 8; 
	}
	pixels() {
		return this.width * this.height;
	}
		
	print() {
		for (let key in this) {
			console.log(key + ": " + this[key] + ',');
		}
	}
		
	printMore() {
		this.print();
		console.log((this.width > this.height) ? 'landscape' : 'portrait');
	}
}


let myImage = new Image(480, 640, 24);
let myImage_2 = new Image(100, 200, 7);
let myImage_3 = new Image(200, 400, 16);

myImage.print();
myImage.printMore();
myImage_2.printMore();
myImage_3.printMore();

class Video extends Image {
	constructor(duration, framerate, width, height, bitdepth) {
		super(width, height, bitdepth);
		this.duration = duration;
		this.framerate = framerate;
		
	}
	totalFrames() { 
		return this.duration * this.framerate;
	}
}

let video_1 = new Video(120, 2, 600, 400, 24);
console.log(video_1.totalFrames());
video_1.print();

let video2 = new Video(200, 2, 300, 200, 16);
video2.print();
video2.printMore();


