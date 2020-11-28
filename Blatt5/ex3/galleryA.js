loadImages(document.getElementById('imageContainer'),'http://localhost/Blatt5/ex3/gallery.json');
// adapt URL of json file if required.

function loadImages(domElement,absoluteURL) {
	//add your code here:
	fetch(absoluteURL)
	.then(response => response.json())
	.then(data => {
		for(let x in data){
			let div = document.createElement("div");
			let imagesmall = document.createElement("img");
			
		
			imagesmall.setAttribute("src", data[x].dataSmall);
			imagesmall.setAttribute("height", 320);
			imagesmall.setAttribute("widtht", 213);
			imagesmall.setAttribute("style", "border:5px solid black");
			
			fetch(data[x].descURL)
			.then(response => response.json())
			.then(data => {
				let description = document.createElement("p");
				description.innerHTML = data.description;
				div.appendChild(description);
			}).catch(() => {
				let description = document.createElement("p");
				description.innerHTML = "Error, description could not be loaded";
				div.appendChild(description);
			});
			
			div.appendChild(imagesmall);
			domElement.appendChild(div);
			
		}
	})
}