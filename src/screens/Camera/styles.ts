import { Camera as ExpoCamera } from 'expo-camera';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import CameraShuttleAnimation from '../../animations/camera-shuttle.json';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  height: 100%;
  background-color: #20232A;
  justify-content: center;
  align-items: center;
`;

export const CustomText = styled.Text`
  color: #fff;
`;

export const Camera = styled(ExpoCamera)`
  position: relative;
  height: ${height}px;
  width: ${width}px;
  align-items: center;
  justify-content: flex-end;
`;

export const ControlsWrapper = styled.View`
  margin-bottom: 30px;
`;

export const ShuttleAnimation = styled(LottieView).attrs({
  source: CameraShuttleAnimation,
})`
  width: 100%;
  height: 100%;
`;

export const TakePictureButton = styled.Pressable`
  height: 100px;
  width: 100px;
  background-color: red;
  border-radius: 50px;
`;
