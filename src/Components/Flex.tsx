import * as React from "react";
import { View, StyleProp, ViewStyle } from "react-native";

export interface IFlexProps {
  flex?: number;
  justify?: "center" | "start" | "end" | "around" | "between" | "evenly";
  align?: "center" | "start" | "end" | "stretch";
  direction?: "column" | "row";
  leftToRight?: "ltr" | "rtf" | "inherit";
  itemAlign?: "auto" | "start" | "end" | "center" | "stretch" | "baseline";
  style?: StyleProp<ViewStyle>;
  wrap?: "wrap" | "nowrap";
  children: any;
}

export class Flex extends React.Component<IFlexProps, {}> {
  mapJustifyToFlex = (value: string): any => {
    switch (value) {
      case "start":
      case "end":
        return `flex-${value}`;
      case "around":
      case "between":
        return `space-${value}`;
      case "evenly":
        return `flex-${value}`;
      default:
        return "center";
    }
  };

  mapAlignToFlex = (value: string): any => {
    switch (value) {
      case "start":
      case "end":
        return `flex-${value}`;
      case "stretch":
        return value;
      default:
        return "center";
    }
  };

  mapSelfAlignToFlex = (value: string): any => {
    switch (value) {
      case "start":
      case "end":
        return `flex-${value}`;
      default:
        return value;
    }
  };
  render() {
    const {
      flex = 1,
      justify = "center",
      align = "center",
      direction = "column",
      leftToRight = "inherit",
      itemAlign = "auto",
      wrap = "wrap",
      style,
      children,
    } = this.props;
    return (
      <View
        style={[
          {
            flex,
            justifyContent: this.mapJustifyToFlex(justify),
            alignItems: this.mapAlignToFlex(align),
            alignSelf: this.mapSelfAlignToFlex(itemAlign),
            flexDirection: direction,
            direction: leftToRight,
            flexWrap: wrap,
          },
          style as any,
        ]}
      >
        {children}
      </View>
    );
  }
}
