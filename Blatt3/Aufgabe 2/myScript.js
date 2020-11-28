var temp = 0;

var breite = document.getElementsByName("Breite")[0];
var länge = document.getElementsByName("Länge")[0];

var button = document.getElementById("berechnen");
var preis = document.getElementById("preis");
var rgb = document.getElementById("rgb");

var rgbRed = null;
var rgbGreen = null;
var rgbBlue = null;
var isGrey = 100;

//Dicke 4
var rad4 = document.getElementById("4");
rad4.addEventListener("click", function(){
	temp = 4;
	update();
});

//Dicke 6
var rad6 = document.getElementById("6");
rad6.addEventListener("click", function(){
	temp = 6;
	update();
});

//Dicke 8
var rad8 = document.getElementById("8");
rad8.addEventListener("click", function(){
	temp = 8;
	update();
});

//Dicke 12
var rad12 = document.getElementById("12");
rad12.addEventListener("click", function(){
	temp = 12;
	update();

});

rgb.addEventListener("change", function(){
	
	const chars = rgb.value.split("");
	rgbRed = chars[1] + chars[2];
	rgbGreen = chars[3] + chars[4];
	rgbBlue = chars[5] + chars[6];
	
	
	if(rgbRed === rgbGreen && rgbGreen === rgbBlue){
		isGrey = 100;
	}
	else{
		isGrey = 64;
	}
	update();
	
});

breite.addEventListener("input", function(){
	update();
});

länge.addEventListener("input", function(){
	update();
});

button.addEventListener("click", function(){
	update();
});

function update(){
	
	if(((breite.value*länge.value*temp)/10)/isGrey===0){
		preis.setAttribute("value", "~");
	}
	else if(breite.value>200 || länge.value>200){
		preis.setAttribute("value", "~");
	}
	else{
		preis.setAttribute("value", ((breite.value*länge.value*temp)/10)/isGrey);
	}
}

