import fetch from 'cross-fetch';
fetch("http://localhost:3000/D:\Programme\GitHub\Web-Technologien\Blatt6\ex2\gallery.csv", {
        method: "GET"
    }).then(response => {
        let json = response.json();
        // status ok
        if (response.ok) return json;
        // error
        return json.then(err => {throw err;});
    }).then(retJson => {
        // show returned json string
        document.querySelector("#jsonText").value = JSON.stringify(retJson, null, 4);
        console.log(JSON.stringify(retJson, null, 4));
        // show images
        let htmlOut = "";
        for (let key in retJson) {
            if (retJson.hasOwnProperty(key)) {
                element = retJson[key];
                htmlOut += `<img src='http://localhost:3000/img/${element.thumbnail}' >`;
            }
        }
        document.querySelector("#pics").innerHTML = htmlOut;
    }).catch(error => {
         console.log("Error: " + error);
    });
