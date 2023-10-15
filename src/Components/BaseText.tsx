import { Colors } from "@/Theme/Variables";
import * as React from "react";
import { Text as RNText, StyleProp, TextStyle } from "react-native";

export interface ITextProps {
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
  align?: "auto" | "left" | "right" | "center" | "justify";
  bold?: boolean;
  size?: number;
  color?: string;
  italic?: boolean;
  weight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  children: any;
}
export class BaseText extends React.Component<ITextProps> {
  render() {
    const {
      onPress,
      children,
      style,
      color = Colors.PRIMARY,
      bold = false,
      italic = false,
      align = "left",
      size = 14,
      weight,
    } = this.props;
    return (
      <RNText
        onPress={onPress}
        style={{
          color,
          fontFamily: "System",
          textAlign: align,
          fontWeight: weight || (bold ? "bold" : "normal"),
          fontSize: size,
          fontStyle: italic ? "italic" : "normal",
          ...(style as any),
        }}
      >
        {children}
      </RNText>
    );
  }
}
