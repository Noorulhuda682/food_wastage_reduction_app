import React from "react"
import { View, Text,TouchableOpacity,Thumbnail,Image} from 'react-native';

import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import { Form } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Camera = ({initialProps, takePhotoFunc }) => {
  console.log("initialProps",takePhotoFunc);
  const [
    { cameraRef, type, ratio, autoFocus, autoFocusPoint, isRecording },
    {
      toggleFacing,
      touchToFocus,
      textRecognized,
      facesDetected,
      recordVideo,
      setIsRecording,
      takePicture
    },
  ] = useCamera(initialProps);

  // console.log("cameraRef",cameraRef);
  const takePhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        // await cameraRef.current.pausePreview();
        // setIsPreview(true);
        console.log("picture source", source);
      }
      takePhotoFunc(data)
    }
  }

  return (
    <View style={{ flex: 1}}>
      <RNCamera
        ref={cameraRef}
        // autoFocusPointOfInterest={autoFocusPoint.normalized}
        type={type}
        // ratio={ratio}
        style={{  flex: 1,alignItems:"flex-end",justifyContent:"flex-end",backgroundColor:"pink"}}
        // autoFocus={autoFocus}
        // onTextRecognized={textRecognized}
        // onFacesDetected={facesDetected}
      >
 

      <TouchableOpacity
        testID="button"
        // onPress={toggleFacing}
        onPress={takePhoto}
        style={{ width: '100%',alignItems:"center",marginBottom:40 }}>
          <Text style={{backgroundColor:"pink",borderRadius:50}}>
            <MaterialCommunityIcons name="camera-iris" size={80} color="deeppink" />
          </Text>
          <Text style={{color:"gray"}}>FWR Camera</Text>
      </TouchableOpacity>
      </RNCamera>
    

   
    </View>
  );
};

export default Camera;