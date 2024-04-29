import React from 'react';
import {Pressable, Text} from 'react-native';
import {colors, globalStyles} from '../../config/theme/app-theme';

interface CalculatorButtonProps {
  label: string;
  color?: string;
  textColor?: boolean;
  doubleSize?: boolean;
  onPress: () => void;
}

export const CalculatorButton = ({
  label,
  color = colors.darkGray,
  textColor = false,
  doubleSize = false,
  onPress,
}: CalculatorButtonProps) => {
  return (
    <Pressable
      onPress={() => onPress()}
      style={({pressed}) => ({
        ...globalStyles.button,
        backgroundColor: color,
        opacity: pressed ? 0.5 : 1,
        width: doubleSize ? 180 : 80,
      })}>
      <Text
        style={{
          ...globalStyles.buttonText,
          color: `${textColor ? 'black' : 'white'}`,
        }}>
        {label}
      </Text>
    </Pressable>
  );
};
