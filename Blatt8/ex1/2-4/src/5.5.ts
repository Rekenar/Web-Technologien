enum type {JPG = 0, GIF = 1, PNG = 2};

interface Rectangular{
    width:number,
    height:number
}
interface Printable{
    print: () => void
    printMore?: () => void
}


class MyImage implements Rectangular, Printable{
    constructor(private __name: string, private __width:number, private __height:number, private __bitdepth:number, private __type: type){
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
         if((this.__width/16)*9 >= this.__height){
            console.log("Landscape");
        }else{
            console.log("Portrait");
        }
    }
    get name(){
        return this.__name;
    }
    get width(){
        return this.__width
    }
    get height(){
        return this.__height;
    }
    get bitdepth(){
        return this.__bitdepth
    }
    get type(){
        return this.__type;
    }
    set name(__name){
        if(__name != null){
            this.__name = __name;
        }
    }
    set width(__width){
        if(__width >= 0){
            this.__width = __width;
        }
    }
    set height(__height){
        if(__height >= 0){
            this.__height = __height;
        }
    }
    set bitdepth(__bitdepth){
        if(__bitdepth >= 0){
            this.__bitdepth = __bitdepth;
        }
    }
    set type(format:type){
        if(format in type){
            this.__type = format;
        }
    }
}
    
class Video extends MyImage implements Rectangular, Printable{
     constructor(private _name: string, private _width: number, private _height: number, 
        private _bitdepth: number, private _duration: number, private _framerate: number, private _type: type){
           super(_name, _width, _height, _bitdepth, _type);
    }
     totalFrames(){
         return this._duration * this._framerate;
      }
    get duration(){
        return this._duration;
    }
    get framerate(){
        return this._framerate
    }
    set duration(_duration){
        if(_duration >= 0){
            this._duration = _duration;
        }
    }
    set framerate(_framerate){
        if(_framerate >= 0){
            this._duration = _framerate;
        }
    }
}

class Printer{
    static printAll() {
        console.log([new Video("video1", 1920,1080,8, 30, 60, 0),new Video("video2", 1920,1080,8, 30, 60, 0),new MyImage("Image1", 1920,1080,8, 30)])
    }
}
class WidthCalculator{
    static getTotalWidth() {
        let array = [new Video("video1", 1920,1080,8, 30, 60, 0),new Video("video2", 1920,1080,8, 30, 60, 0),new MyImage("Image1", 1920,1080,8, 30)];
        var width = 0;
        for(let i = 0; i<array.length;i++){
            width += array[i].width;
        }
        console.log(width);
    }
}

var video1 = new Video("video1", 1920,1080,8, 30, 60, 0);
var video2 = new Video("video2",1080,1920,8, 15, 30, 1);
var video3 = new Video("video3",1366,768,8, 10, 120, 2);
Printer.printAll();
WidthCalculator.getTotalWidth();   
/**video1.print();
console.log(video1.totalFrames());
console.log("");
video2.print();
video2.type = type.PNG;
console.log(video2.totalFrames());
console.log("");
video3.type = type.GIF;
video3.printMore();
console.log(video3.totalFrames());**/