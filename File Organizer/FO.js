/**
 * 
 * Name of project : A File System Organizer (Using node.js module)
 * Type : Command Line Project
 */

/**
 * Features of project :
 *   *If you have a lot of files in a folder and they are not properly arranged.
 *    so you can use this tool to arrange them in a directory according to their extension
 *    so at the end you will get organized files in a folder
 * 
 *   *For Example : If you have .txt , .exe and .png files in a folder. you want to arrange them then this 
 *    tool will help you to arrange like .txt file will go to text file Folder. .png will go to images Folder etc.
 */

const fs = require('fs');
const path = require('path');

let types = {               //object of arrays (key : value pair)
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    images: ["jpg", "jpeg", "jfif", "pjpeg", "pjp", "png", "webp", "svg", "PNG"],
    programming: ["c", "c++", "java", "py", "bin", "php", "asm", "class", "js", "html", "css"],
    documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex"],
    app: ["exe", "dmg", "pkg", "deb"]
};


let input = process.argv.slice(2);        //It is an Array of type string. It is used to take input from cmd

let command = input[0];  // tree, organize , help ,any invalid instruction

switch (command) {

    case "tree":
        treeFn(input[1]);
        break;
    case "organize":
        organizeFn(input[1]);
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("PLEASE ENETER A VALID COMMAND");

}


function helpFn() {                                            //** (``) backtick is used to write string in differnt line */
    console.log(`List of all the commands -->                              
                  1) Tree Command     -- node FO.js tree <dirname>
                  2) Organize Command -- node FO.js organize <dirname>
                  3) Help Command     -- node FO.js help`);

}

function organizeFn(dirpath) {
    let destpath;                   //Input a directory path  [dirpath]
    if (dirpath == undefined) {
        //check wheather dirpath is exist or not 
        console.log("PLEASE ENTER A VALID DIRECTORY PATH");
        return;
    }
    else {             //if exist            
        let doesExit = fs.existsSync(dirpath);
        if (doesExit == true) {
            //check wheather dirpath is valid or not if it is valid create destpath 
            destpath = path.join(dirpath, 'organized_files');
            if (fs.existsSync(destpath) == false) {
                   // check wheather dirpath is already exist or not
                fs.mkdirSync(destpath);
            }
            else {
                //If dirpath is already exist
                console.log("THIS FOLDER ALREADY EXIT");
            }
        }
        else {
            // entered path is invalid
            console.log("PLEASE ENTER A VALID DIRECTORY PATH");
        }
    }
    organizeHelper(dirpath, destpath);
}

// This organizeHelper() function will categorised different files of dirpath 
function organizeHelper(src, des) {

    let children = fs.readdirSync(src);  //get the content/details of src
    // console.log(children);  
    for (let i = 0; i < children.length; i++) {
        let childrenAddress = path.join(src, children[i]);
        let isFile = fs.lstatSync(childrenAddress).isFile();
        // console.log(childrenAddress+" -->"+isFile);
        if (isFile == true) {
            let getCat = getCategory(children[i]);

            sendFiles(childrenAddress,des,getCat); //used to send files to its appropriate folder     
        }
    }

}

// this function gives extension of paseed file---> get extension and map with types object's key      
function getCategory(filename) {
    let exe = path.extname(filename);
    // console.log(exe);
    exe = exe.slice(1);

    for (let type in types) {
        let ctypes = types[type];
        // console.log(ctypes);
       for (let i = 0; i < ctypes.length; i++) {
            if (ctypes[i] == exe) {
                return type;
            }
        }
    }
    return "others"
}

function sendFiles(srcFilePath , dest , fileCategory){

    let destpath=path.join(dest,fileCategory);   

    if(fs.existsSync(destpath)==false){   //create new directory if it is not available
        fs.mkdirSync(destpath);
        //  console.log(destFilepath);
    }
    else{
        console.log("THIS FOLDER ALREADY EXITS");
    }

    let filename=path.basename(srcFilePath);       //extract basefile name from path
    let destFilepath=path.join(destpath,filename);  //destination path where files need to be sent
    fs.copyFileSync(srcFilePath,destFilepath);      // files copied

    fs.unlinkSync(srcFilePath);                      //delete files from source
}

//Tree Function
function treeFn(dirpath){
  
    if(dirpath==undefined){
        console.log("ENTER A VALID DIRECTORY PATH");
    }
    else{
        let doesExit = fs.existsSync(dirpath);
        if(doesExit==true){
            treeHelper(dirpath," ");
        }
    }
}

function treeHelper(targetpath , indent){

    let isFile=fs.lstatSync(targetpath).isFile();
    if(isFile== true){                     
    //   console.log(indent+"├──"+filename);  
    //     console.log(indent+"├──"+filename);  
        let filename = path.basename(targetpath); //if targetpath is file just print with ├──file name
        console.log(indent+"├──"+filename);  
    } 
    else{                                           //if targetpath is folder check its children and again 
                                                    //       perform same work for them
        let dirname = path.basename(targetpath);
        console.log(indent+"└──"+dirname);
        let children = fs.readdirSync(targetpath);
        // console.log(children);
        for(let i=0;i<children.length;i++){
           let childpath=path.join(targetpath,children[i]);
           treeHelper(childpath , indent+"\t");
        }

    }   
}



