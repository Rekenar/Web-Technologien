class JsonGallery
{
    constructor(wrapperElement, user)
    {
        this.intervalID = null;
        this.user = user;
        this.galleryClass = "gallery";

        wrapperElement.innerHTML = `<div class="${this.galleryClass}"></div>
                                    <div id="displayDIV">
                                        <img class="bigIMG" src="">
                                        <div><p class="desc"></p></div>
                                    </div>`;

        // setup buttons etc.
        this.setupInterface();
    }

    setupInterface()
    {
        // fullscreen controls
        let buttons = {"prev": () => this.jump(-1),
                       "next": () => this.jump(+1),
                       "play/pause": () => this.togglePlay(),
                       "exit": () => this.toggleBigImage(false)};
        let controls = document.createElement("DIV");
        Object.keys(buttons).forEach(
            (key, index) => {
            let button = document.createElement("button");
            button.innerText=key;
            button.addEventListener("click", buttons[key]);
            controls.appendChild(button);
        });
        document.getElementById("displayDIV").appendChild(controls);

        // close big imgs on click
        document.querySelector(".bigIMG").addEventListener("click", this.toggleBigImage(false));
    }

    // initialize gallery for user
    init()
    {
        let images = document.querySelectorAll('.'+this.galleryClass+' img');
        for (let i=0; i< images.length; i++) {
           images[i].addEventListener("click", () => this.toggleBigImage(true, images[i]));
        }
    }

    // deinitialize gallery (cleanup on logout)
    deinit()
    {
        clearInterval(this.intervalID);
        this.intervalID = null;
        document.querySelector('.' + this.galleryClass).innerHTML = "";
    }

    // fetch JSON list of images from server and init gallery
    load({onFail})
    {
        return this.getImages()
            .then((result) => this.loadImages(result), onFail)
            .then(() => this.init());
    }

    // TODO EX3.b:
    // fetch image list from server resolving promise passing the received json
    // or rejecting it with corresponding error
    getImages()
    {
        let galleryUrl = `http://${config.serverHost}:${config.serverPort}/${config.galleryRoute}`;
        return new Promise((resolve, reject) => {
            reject(); // replace with your code
        });
    }

    // returns promise resolving after images loaded into .gallery element
    loadImages(json)
    {
        return new Promise( (resolve, reject) => {
            let galleryDiv = document.querySelector('.'+this.galleryClass);
            let htmlOut = "";
            Object.keys(json).forEach(
                (key) => {
                    htmlOut += `<img src="http://${config.serverHost}:${config.serverPort}/${json[key].dataSmall}"
                               data-large="http://${config.serverHost}:${config.serverPort}/${json[key].dataBig}"
                               data-dbid="${parseInt(key)+1}"
                               alt="${json[key].description}">`;
                }
            );
            galleryDiv.innerHTML = htmlOut;
            resolve();
        });
    }

    getCurrentImageIdx() {
        let bigImgSrc = document.querySelector("#displayDIV > img").getAttributeNode("src").value;
        let smallImgs = document.querySelectorAll("."+this.galleryClass+" > img");
        for(let i=0; i<smallImgs.length; i++) {
            if (smallImgs[i].dataset.large === bigImgSrc) return i;
        }
    }

    // positive modulo for negative numbers
    modulo(a,b){
        return ((a%b)+b)%b;
    }

    // fullscreen navigation
    jump(value) {
    	let images = document.querySelectorAll('.'+this.galleryClass+' img');
    	let pos = this.getCurrentImageIdx();
    	pos = this.modulo((pos+value), images.length);
      let bigIMG = document.querySelector("#displayDIV .bigIMG");
      bigIMG.src=images[pos].dataset.large;
      bigIMG.dataset.dbid=images[pos].dataset.dbid;
  	  document.querySelector("#displayDIV .desc").innerHTML=images[pos].alt;
    }

    toggleBigImage(value, image=null) {
       if (value && image)  {
           let bigIMG = document.querySelector("#displayDIV .bigIMG");
           bigIMG.src=image.dataset.large;
           bigIMG.dataset.dbid=image.dataset.dbid;
           document.querySelector("#displayDIV .desc").innerText=image.alt;
           document.getElementById("displayDIV").style.display="block";
       }
       else {
           document.getElementById("displayDIV").style.display="none";
           if (this.intervalID) this.togglePlay(); // exit slideshow
       }
    }

    togglePlay() {
    	if (this.intervalID) {
    		clearInterval(this.intervalID);
            this.intervalID = null;
    	}
    	else {
            this.intervalID = setInterval( () => this.jump(+1),2000);
        }
    }
}
