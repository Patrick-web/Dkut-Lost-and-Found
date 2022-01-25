import { ActivityIndicator, Pressable, Text } from "react-native"

interface Props {
  text?: String;
  onPress?: () => any;
  height?: string | number;
  width?: string | number;
  radius?: number;
  color?: string;
  padding?: number;
  style?: any;
  textColor?: string;
  isLoading?: boolean;
}
const Button = ({ isLoading, text, textColor, onPress, color, height, width, radius, padding, style }: Props) => {

  return (
    <Pressable onPress={onPress} style={{ ...style, isLoading: isLoading, backgroundColor: color, width: width, height: height, borderRadius: radius || 20, paddingVertical: 10, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
      {
        isLoading ?
          <ActivityIndicator size="small" color={textColor || "#FF9387"} />
          :
          <Text style={{ color: textColor || 'white', fontWeight: 'bold' }}>{text}</Text>
      }
    </Pressable>
  )
}

export default Button;
