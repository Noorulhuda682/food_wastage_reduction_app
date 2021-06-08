
const fetch = require("node-fetch")

const uploadImageToCloud = async (data) => {
    // let imageFile = {
    //     uri:url,
    //     type:`test/${url.split(".")[url.split(".").length-1]}`,
    //     name:`test.${url.split(".")[url.split(".").length-1]}`
    // }
    
    // var data = new FormData()
    // console.log("DATA=====>1",imageFile,data);

    // data.append("file",imageFile);
    // data.append("upload_preset","_fwr_storage");
    // data.append("cloud_name","dccdiflrm");

    // Calling cloudinary api
    var responseData = await fetch("https://api.cloudinary.com/v1_1/dccdiflrm/image/upload",{
        method:"POST",
        body:data,
        headers:{
            'Accept':'application/json',
            'Content-Type':'multipart/form-data'
        }
    }).then( res => res.json())
    .then( data => {
        console.log("DATA=====> saad1",data);
        return {
            uploading:true,
            message:"Uploading successfull",
            url:data.url
        }
    }).catch( err => {
        return {
            uploading:false,
            message:`Error while Uploading: ${err}`,
            url:"uploading_error"
        }
    })

  return responseData;
}


module.exports = uploadImageToCloud;