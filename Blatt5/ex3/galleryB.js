loadImages(document.getElementById('imageContainer'),'http://localhost/Blatt5/ex3/gallery.json');
// adapt URL of json file if required.

async function loadImages(domElement,absoluteURL) {
	//add your code here:
	try{
		const response = await fetch(absoluteURL);
		const data = await response.json();
		
		for(let x in data){
			
			let div = document.createElement("div");
			let imagesmall = document.createElement("img");
			let description = document.createElement("p");
			imagesmall.setAttribute("src", data[x].dataSmall);
			imagesmall.setAttribute("height", 320);
			imagesmall.setAttribute("widtht", 213);
			imagesmall.setAttribute("style", "border:5px solid black");
			
			try{
				let response1 = await fetch(data[x].descURL);
				let data1 = await response1.json();
				
				description.innerHTML = data1.description;
				
			}catch(e){
				description.innerHTML = "Error, description could not be loaded";
			}

			div.appendChild(imagesmall);
			div.appendChild(description);
			domElement.appendChild(div);
		}
		
		
	}catch(e){
		
	}
}