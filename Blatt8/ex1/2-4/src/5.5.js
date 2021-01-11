var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var format;
(function (format) {
    format[format["JPG"] = 0] = "JPG";
    format[format["GIF"] = 1] = "GIF";
    format[format["PNG"] = 2] = "PNG";
})(format || (format = {}));
;
var MyImage = /** @class */ (function () {
    function MyImage(__name, __width, __height, __bitdepth, __format) {
        this.__name = __name;
        this.__width = __width;
        this.__height = __height;
        this.__bitdepth = __bitdepth;
        this.__format = __format;
    }
    MyImage.prototype.print = function () {
        for (var val in this) {
            if (val !== "print") {
                if (val !== "totalFrames") {
                    console.log(this[val]);
                }
            }
        }
    };
    MyImage.prototype.printMore = function () {
        this.print();
        if ((this.__width / 16) * 9 >= this.__height) {
            console.log("Landscape");
        }
        else {
            console.log("Portrait");
        }
    };
    Object.defineProperty(MyImage.prototype, "name", {
        get: function () {
            return this.__name;
        },
        set: function (__name) {
            if (__name != null) {
                this.__name = __name;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyImage.prototype, "width", {
        get: function () {
            return this.__width;
        },
        set: function (__width) {
            if (__width >= 0) {
                this.__width = __width;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyImage.prototype, "height", {
        get: function () {
            return this.__height;
        },
        set: function (__height) {
            if (__height >= 0) {
                this.__height = __height;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyImage.prototype, "bitdepth", {
        get: function () {
            return this.__bitdepth;
        },
        set: function (__bitdepth) {
            if (__bitdepth >= 0) {
                this.__bitdepth = __bitdepth;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyImage.prototype, "format", {
        get: function () {
            return this.__format;
        },
        set: function (__format) {
            if (__format in format) {
                this.__format = __format;
            }
        },
        enumerable: false,
        configurable: true
    });
    return MyImage;
}());
var Video = /** @class */ (function (_super) {
    __extends(Video, _super);
    function Video(_name, _width, _height, _bitdepth, _duration, _framerate, _format) {
        var _this = _super.call(this, _name, _width, _height, _bitdepth, _format) || this;
        _this._name = _name;
        _this._width = _width;
        _this._height = _height;
        _this._bitdepth = _bitdepth;
        _this._duration = _duration;
        _this._framerate = _framerate;
        _this._format = _format;
        return _this;
    }
    Video.prototype.totalFrames = function () {
        return this._duration * this._framerate;
    };
    Object.defineProperty(Video.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        set: function (_duration) {
            if (_duration >= 0) {
                this._duration = _duration;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Video.prototype, "framerate", {
        get: function () {
            return this._framerate;
        },
        set: function (_framerate) {
            if (_framerate >= 0) {
                this._duration = _framerate;
            }
        },
        enumerable: false,
        configurable: true
    });
    return Video;
}(MyImage));
var video1 = new Video("video1", 1920, 1080, 8, 30, 60, 0);
var video2 = new Video("video2", 1080, 1920, 8, 15, 30, 1);
var video3 = new Video("video3", 1366, 768, 8, 10, 120, 2);
video1.print();
console.log(video1.totalFrames());
console.log("");
video2.print();
console.log(video2.totalFrames());
console.log("");
video3.printMore();
console.log(video3.totalFrames());
