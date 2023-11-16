const request = require('request');
const fs = require('fs');
const options = process.argv.slice(2);

const printResults = (bytes, file) =>{
  console.log(`Downloaded and saved ${bytes} bytes to ${file}`);
};

const fileCheck = (newFile, callback) => {
  
  fs.readdir("./", (err, files)=>{
    if (files.includes(newFile)) {
      callback(false);
    } else {
      callback(true);
    }
  });
  
};

const readAndWrite = (print, fileCheck) => {
  if (!options[0] || !options[1]) {
    console.log("Two inputs needed");
    return;
  }

  fileCheck(options[1], (valid) => {

    if (!valid) {
      console.log("File already exists");
      return;
    }

    return request(`${options[0]}`, (error, repsonse, body)=>{

      try {

        if (error) {
          throw new Error("Server Error");
        }

        if (repsonse.statusCode === 404) {
          throw new Error("Not Found");
        }
          
      } catch (error) {
        console.log("Error: ", error.message);
        return;
      }
        
      fs.writeFile(options[1], body, "utf8", (err)=>{
        if (err) {
          console.log(err);
          return;
        }
      });
        
      print(repsonse.headers['content-length'], options[1]);
    });

  });
      
};
    



readAndWrite(printResults, fileCheck);

