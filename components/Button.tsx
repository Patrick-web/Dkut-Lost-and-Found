import { useEffect } from "react";
import { ActivityIndicator, Pressable, Text } from "react-native"

interface Props {
  text?: String;
  onPress?: () => any;
  height?: string | number;
  width?: string | number;
  radius?: number;
  color?: string;
  padding?: number;
  styles?: any;
  textColor?: string;
  isLoading?: boolean;
}
const Button = ({ isLoading, text, textColor, onPress, color, height, width, radius, padding, styles }: Props) => {

useEffect(()=>{
    console.log(styles)
  },[])

  return (
    <Pressable onPress={onPress} style={{ isLoading: isLoading, backgroundColor: color, width: width, height: height, borderRadius: radius || 20, paddingVertical: styles?.paddingVertical || 10, paddingHorizontal: styles?.paddingHorizontal || 20, alignItems: 'center', justifyContent: 'center',...styles }}>
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
