import React, { useEffect, useRef, useState } from 'react';
import ml from '@react-native-firebase/ml';

import {
  Container,
  CustomText,
  Camera,
  ControlsWrapper,
  TakePictureButton,
  ShuttleAnimation,
} from './styles';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const cameraRef = useRef(null);
  const animationRef = useRef(null);

  const requestPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const recognizeTextInImage = (localPath: string) => {
    ml().cloudDocumentTextRecognizerProcessImage(localPath)
      .then((processed) => {
        console.log('Found text in document: ', processed.text);

        processed.blocks.forEach((block) => {
          console.log('Found block with text: ', block.text);
          console.log('Confidence in block: ', block.confidence);
          console.log('Languages found in block: ', block.recognizedLanguages);
        });
      }).catch((error) => console.log(error));
  };

  const takePicture = async () => {
    if (isReady) {
      animationRef.current.play();
      const picture = await cameraRef.current.takePictureAsync();

      // recognizeTextInImage(picture.uri);
    } else {
      alert('Camera is no ready!');
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <Container>
      {
        hasPermission ? (
          <Camera
            ref={cameraRef}
            type={Camera.Constants.Type.back}
            ratio="16:9"
            onCameraReady={() => setIsReady(true)}
          >
            <ControlsWrapper>
              <TakePictureButton onPress={takePicture}>
                <ShuttleAnimation
                  ref={animationRef}
                  autoPlay
                  loop={false}
                  duration={1500}
                />
              </TakePictureButton>
            </ControlsWrapper>
          </Camera>
        ) : (
          <CustomText>
            No permition to access camera
          </CustomText>
        )
      }
    </Container>
  );
};

export default CameraScreen;
