import React from "react";

const uploadImageToCloud = async (image) => {
    var data = new FormData()
    data.append("file",image)
    data.append("upload_preset","_fwr_storage")
    data.append("cloud_name","dccdiflrm")
    
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
            message:"Error while Uploading",
            url:"uploading_error"
        }
    })

  return responseData;
}



export default uploadImageToCloud