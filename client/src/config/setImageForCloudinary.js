import React from "react";


const setImageFileForCloudinary = (url) => {
    let imageFile = {
        uri:url,
        type:`test/${url.split(".")[url.split(".").length-1]}`,
        name:`test.${url.split(".")[url.split(".").length-1]}`
    }
    return imageFile
}

export default setImageFileForCloudinary;