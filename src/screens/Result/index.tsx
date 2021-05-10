import React, { useEffect } from 'react';
import { Text } from 'react-native';
import ml from '@react-native-firebase/ml';

// import { Container } from './styles';

const Result: React.FC = ({ route }) => {
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

  useEffect(() => {

  }, []);

  return (
    <Text>teste</Text>
  );
};

export default Result;
