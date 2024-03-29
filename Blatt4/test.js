class Image{
constructor(width, height, bitdepth){
	this.width = width;
	this.height = height;
	this.bitdepth = bitdepth;
	this.rawsize = width * height * bitdepth;
	this.pixels = width * height;
}

	print(){
		for(let val in this){
			if(val !== "print" ){
				if(val !== "totalFrames"){
					console.log(this[val]);
				}
			}
		}
	}
	printMore(){
		this.print();
		if((this.width/16)*9 >= this.height){
			console.log("Landscape");
		}else{
			console.log("Portrait");
		}
	}
}

class Video extends Image{
	constructor(width, height, bitdepth, duration, framerate){
		super(width, height, bitdepth);
		this.duration = duration;
		this.framerate = framerate;
	}
	totalFrames(){
		return this.duration * this.framerate;
	}
}


	var video1 = new Video(1920,1080,8, 30, 60);
	var video2 = new Video(1080,1920,8, 15, 30);
	var video3 = new Video(1366,768,8, 10, 120);

	video1.print();
	console.log(video1.totalFrames());
	console.log("");
	video2.print();
	console.log(video2.totalFrames());
	console.log("");
	video3.printMore();
	console.log(video3.totalFrames());