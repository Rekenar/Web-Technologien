// call with node add_rented_field.js

let fs = require('fs'); // for reading files

const in_file = "./books.json";
const out_file = './books_altered.json';


let content = fs.readFileSync(in_file, 'utf8');
data = JSON.parse(content);


// UNUSED: just adds field "rented: false" to data writing results to file
function addRentedInfo(outFile) {
  for (let b of data) {
    if (!b['rented']) b['rented'] = false;
  }
  let outTxt = JSON.stringify(data);
  // write to new file 'outFile'
  fs.writeFile(outFile, outTxt, (err) => {
      if (err) throw err;
      // success, the file was saved
      console.log(outFile + ' was saved!');
  });
}

// don't use 'nodemon' here since it writes to dir, restarting the server
addRentedInfo(out_file);
