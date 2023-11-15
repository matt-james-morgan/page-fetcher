const request = require('request');
const fs = require('fs');
const options = process.argv.slice(2);

const printResults = (bytes, file) =>{
  console.log(`Downloaded and saved ${bytes} bytes to ${file}`)
}

function readAndWrite(callback){
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
  }catch(error){
    console.log("Error: ", error.message);
    return;
  }

  
  
  callback(repsonse.headers['content-length'], options[1]);
})
}

readAndWrite(printResults);

