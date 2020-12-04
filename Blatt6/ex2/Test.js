var http = require('http');
var fs = require('fs');
var jsonArray = [];


http.createServer(function (req, res) {
  fs.readFile('gallery.csv',function(err,data){
		if(err){
			return  console.log(err);
		}
		res.writeHead(200, {'Content-Type': 'text/plain'});
		var dataArray = data.split("\n");
		var fieldsArray =  dataArray[0].split(",");
		
		for(var i=1;i<dataArray.length;i++){
			var temp = {};
        //contains values which are separated by a comma in a line.
			var valuesArray = dataArray[i].split(",");
				for(var k=0;k<valuesArray.length;k++){
					temp[fieldsArray[k]] = valuesArray[k]
				}
			//pushes the object into the array.
			jsonArray.push(temp);
		}
		
		
		res.write(jsonArray);
		return res.end();
  });
  
}).listen(8070);