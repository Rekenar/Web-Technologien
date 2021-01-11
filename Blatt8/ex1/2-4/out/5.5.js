"use strict";
var type;
(function (type) {
    type[type["JPG"] = 0] = "JPG";
    type[type["GIF"] = 1] = "GIF";
    type[type["PNG"] = 2] = "PNG";
})(type || (type = {}));
;
class MyImage {
    constructor(__name, __width, __height, __bitdepth, __type) {
        this.__name = __name;
        this.__width = __width;
        this.__height = __height;
        this.__bitdepth = __bitdepth;
        this.__type = __type;
    }
    /**print(){
        for(let val in this){
            if(val !== "print" ){
                if(val !== "totalFrames"){
                    console.log(this[val]);
                }
            }
        }
     }**/
    printMore() {
        //this.print();
        if ((this.__width / 16) * 9 >= this.__height) {
            console.log("Landscape");
        }
        else {
            console.log("Portrait");
        }
    }
    get name() {
        return this.__name;
    }
    get width() {
        return this.__width;
    }
    get height() {
        return this.__height;
    }
    get bitdepth() {
        return this.__bitdepth;
    }
    get type() {
        return this.__type;
    }
    set name(__name) {
        if (__name != null) {
            this.__name = __name;
        }
    }
    set width(__width) {
        if (__width >= 0) {
            this.__width = __width;
        }
    }
    set height(__height) {
        if (__height >= 0) {
            this.__height = __height;
        }
    }
    set bitdepth(__bitdepth) {
        if (__bitdepth >= 0) {
            this.__bitdepth = __bitdepth;
        }
    }
    set type(format) {
        if (format in type) {
            this.__type = format;
        }
    }
}
class Video extends MyImage {
    constructor(_name, _width, _height, _bitdepth, _duration, _framerate, _type) {
        super(_name, _width, _height, _bitdepth, _type);
        this._name = _name;
        this._width = _width;
        this._height = _height;
        this._bitdepth = _bitdepth;
        this._duration = _duration;
        this._framerate = _framerate;
        this._type = _type;
    }
    totalFrames() {
        return this._duration * this._framerate;
    }
    get duration() {
        return this._duration;
    }
    get framerate() {
        return this._framerate;
    }
    set duration(_duration) {
        if (_duration >= 0) {
            this._duration = _duration;
        }
    }
    set framerate(_framerate) {
        if (_framerate >= 0) {
            this._duration = _framerate;
        }
    }
}
class Printer {
    static printAll() {
        console.log([new Video("video1", 1920, 1080, 8, 30, 60, 0), new Video("video2", 1920, 1080, 8, 30, 60, 0), new MyImage("Image1", 1920, 1080, 8, 30)]);
    }
}
class WidthCalculator {
    static getTotalWidth() {
        let array = [new Video("video1", 1920, 1080, 8, 30, 60, 0), new Video("video2", 1920, 1080, 8, 30, 60, 0), new MyImage("Image1", 1920, 1080, 8, 30)];
        var width = 0;
        for (let i = 0; i < array.length; i++) {
            width += array[i].width;
        }
        console.log(width);
    }
}
var video1 = new Video("video1", 1920, 1080, 8, 30, 60, 0);
var video2 = new Video("video2", 1080, 1920, 8, 15, 30, 1);
var video3 = new Video("video3", 1366, 768, 8, 10, 120, 2);
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
