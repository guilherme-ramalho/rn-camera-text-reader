import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import ml from '@react-native-firebase/ml';

import { Container } from './styles';

const Result: React.FC = ({ route }) => {
  const [imageText, setImageText] = useState('');

  const recognizeTextInImage = (localPath: string) => {
    ml().cloudDocumentTextRecognizerProcessImage(localPath)
      .then(({ text }) => {
        console.log('Found text in document: ', text);
        setImageText(text);
      }).catch((error) => console.log(error));
  };

  useEffect(() => {
    const { imageUri } = route.params;

    recognizeTextInImage(imageUri);
  }, []);

  return (
    <Container>
      {imageText.length > 0 ? (
        <Text>{imageText}</Text>
      ) : (
        <ActivityIndicator size="large" color="#fff" />
      )}
    </Container>
  );
};

export default Result;
