const request = require('request');
const fs = require('fs');
const { error } = require('console');
const options = process.argv.slice(2);

const printResults = (bytes, file) =>{
  console.log(`Downloaded and saved ${bytes} bytes to ${file}`)
}

const fileCheck = (newFile) => {
  fs.readdir("./", (err, files)=>{
    if(err){
      console.log(err);
    }else{
      files.forEach(file=>{
        if(file === newFile){
          return false
        }
      })
    }
  })
  return true;
}

function readAndWrite(print, checkFile){
  return request(`${options[0]}`, (error, repsonse, body)=>{
  try{
    if(error){
      throw new Error("Server Error")
    }
    if(repsonse.statusCode === 404){
      throw new Error("Not Found");
    }
    if(!options[0] || !options[1]){
      throw new Error("Need two inputs");
    }
    if(!checkFile(options[1])){
      throw new Error("File already exists");
    }
    
  }catch(error){
    console.log("Error: ", error.message);
    return;
  }
  
  
  
  print(repsonse.headers['content-length'], options[1]);
})
}



readAndWrite(printResults);

