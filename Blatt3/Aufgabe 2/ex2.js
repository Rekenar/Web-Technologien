function calculate(){
	
	var color = document.getElementById("colorField").value;
	
	width = document.getElementsByName("widthField")[0].value;
	height = document.getElementsByName("heightField")[0].value;
	
	
	
	
	if(document.getElementsByName("mmField")[0].checked){
		thickness = (document.getElementsByName("mmField")[0].value)/100;
	}
	if(document.getElementsByName("mmField")[1].checked){
		thickness = (document.getElementsByName("mmField")[1].value)/100;
	}
	if(document.getElementsByName("mmField")[2].checked){
		thickness = (document.getElementsByName("mmField")[2].value)/100;
	}
	if(document.getElementsByName("mmField")[3].checked){
		thickness = (document.getElementsByName("mmField")[3].value)/100;
	}
	
	
	console.log(width);
	console.log(height);
	console.log(thickness);
	
	price = width * height * thickness / 64
	document.getElementById("priceField").value = price;
}