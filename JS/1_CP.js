// const cp = require('child_process')

// console.log("Calculator is opened")

// let output=cp.execSync('ping');

// console.log("output -->"+output);

// const os= require('os');


// console.log(os.platform());

// console.log(os.cpus())





 /**
  *       **** FILES****
  */

//We will be reading writing updating and ingdelet

   const fs=require('fs');
   const path=require('path');

//Reading from a file --> readFileSyn('file name')   
// let output = fs.readFileSync('f.txt');

// console.log(" "+output);

//Writing in a file --->writeFileSync('file_name', 'data to be sent')
//  fs.writeFileSync('f.txt' , 'Aashish');


//If a passed file is not found , a new file will be created with same name ....

//append a file---> appendFileSync('file name' , 'data')
// fs.appendFileSync('f.txt',' Aashish Omre')

//unlinkSyn('file name')--->used to delete a file.
// fs.unlinkSync('f.txt');


/**
 * 
 *     ***Directories**
 */

//creating a directory

//mkdirSync() method is used to creat a new directory or folder
  //  fs.mkdirSync('new folder');


  // removedirSync()-->used to delete folder 
    // fs.rmdirSync('new folder');
 

  //check wheather a folder or directory  and file exist or not 
  //  let output=fs.existsSync('test.js');
  //  console.log(output);

  // lstatSyn('filename') 
  let statofDirectory =fs.lstatSync('test.js');
  // console.log(statofDirectory);

  //  console.log('isFile?',statofDirectory.isFile());

  //  console.log('isDirectory?',statofDirectory.isDirectory());


  // readDirSync()--> Gives details about a directory
    //  let folderpath ='F:\\NODE';
    //  let foldercontent=fs.readdirSync(folderpath);
    //  console.log(foldercontent);

  
  //Copying Files
      //  src file , destination path
 
      let src="F:\\NODE\\a.asm";
      let dest="F:\\NODE\\Test";
      
      let filetobecopied = path.basename(src);
      let destinationPath=path.join(dest,filetobecopied);
      // console.log(destinationPath);
      // console.log(filetobecopied);
      fs.copyFileSync( filetobecopied , destinationPath);
      console.log("File copi1ed");
    






