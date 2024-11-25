import React from "react";
import { Text, TextProps, StyleProp, TextStyle } from "react-native";
import { fs } from "@/utils/config";
import { getColor } from "@/utils/theme";

interface ThemedTextProps extends TextProps {
  link?: boolean;
  fontSize?: number;
  fontWeight?: TextStyle["fontWeight"];
}

const ThemedText: React.FC<ThemedTextProps> = ({
  style,
  link,
  children,
  fontSize = 18,
  fontWeight,
  ...props
}) => {
  const nativeStyle: StyleProp<TextStyle> = { fontSize: fs(fontSize), fontWeight: fontWeight, fontFamily: "Nunito" }
  const {primary, text} = getColor()
  nativeStyle.color = text
  if(link) {
    nativeStyle.color = primary
    nativeStyle.textDecorationColor = primary 
    nativeStyle.textDecorationLine = "underline"
    nativeStyle.cursor = "pointer"
  }
  return (
    <Text
      style={[nativeStyle, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
