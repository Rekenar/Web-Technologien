loadImages(document.getElementById('imageContainer'),'http://localhost/Blatt5/ex2/gallery.json');
// adapt URL of json file if required.

function loadImages(domElement,absoluteURL) {
	//add your code here:
	
	var xhr = new XMLHttpRequest();
	xhr.open('GET',absoluteURL);
	xhr.responseType = 'json';
	xhr.send();
	xhr.onload = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			let info = xhr.response;
			for(let x in info){
				console.log(x);
				let div = document.createElement("div");
				let imagesmall = document.createElement("img");
				let description = document.createElement("p");
				
				imagesmall.setAttribute("src", info[x].dataSmall);
				imagesmall.setAttribute("height", 320);
				imagesmall.setAttribute("widtht", 213);
				imagesmall.setAttribute("style", "border:5px solid black");
				
				description.innerHTML = info[x].description;
				
				div.appendChild(imagesmall);
				div.appendChild(description);
				domElement.appendChild(div);
				console.log(info[x].dataSmall);
			}
			
		}
	
	}
}

