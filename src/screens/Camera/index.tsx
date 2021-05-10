import React, { useEffect, useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  Container,
  CustomText,
  Camera,
  ControlsWrapper,
  TakePictureButton,
  ShuttleAnimation,
} from './styles';

interface PictureResponse {
  uri: string;
  height: number;
  width: number;
  exif?: object;
  base64?: string;
}

interface Props {
  navigation: StackNavigationProp<any, any>;
}

const CameraScreen: React.FC<Props> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const cameraRef = useRef(null);
  const animationRef = useRef(null);

  const requestPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const takePicture = () => {
    if (isReady) {
      animationRef.current.play();

      cameraRef.current.takePictureAsync()
        .then(({ uri }: PictureResponse) => {
          navigation.navigate('Result', { uri });
        })
        .catch(() => alert('Error taking picture'));
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
            type={Camera.Constants.Type.front}
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
