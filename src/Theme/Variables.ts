/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export enum Colors {
  TRANSPARENT = "rgba(0,0,0,0)",
  INPUT_BACKGROUND = "#FFFFFF",
  WHITE = "#ffffff",
  BLACK = "#000000",
  TEXT = "#212529",
  PRIMARY = "#273c75",
  SECONDARY = "#79a2cc",
  SUCCESS = "#28a745",
  ERROR = "#dc3545",
}

export enum NavigationColors {
  PRIMARY = Colors.PRIMARY,
}

/**
 * FontSize
 */
export enum FontSize {
  SMALL = 16,
  REGULAR = 20,
  LARGE = 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5; // 10
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const large = regular * 2; // 30

export enum MetricsSizes {
  TINY = tiny,
  SMALL = small,
  REGULAR = regular,
  LARGE = large,
}

import { Dimensions } from "react-native";

class DeviceData {
  private width: number;
  private height: number;

  constructor() {
    this.width = Dimensions.get("window").width;
    this.height = Dimensions.get("window").height;
  }
  getDeviceWidth = () => this.width;
  getDeviceHeight = () => this.height;
}

export const deviceData = new DeviceData();

export const themeVariables = {
  transparentColor: "rgba(0,0,0,0)",
  primaryColor: "#03004d",
  blueSecondaryColor: "#1A2EFE",
  whiteSecondaryColor: "#FDFDFD",
  blackSecondaryColor: "#2d3436",

  backgroundColor: "#ffffff",
  itemBackgroundColor: "#f2f5f8",

  primaryTextColor: "#03004d",
  blackSecondaryTextColor: "#3a3436",
  blueSecondaryTextColor: "#2980b9",
  darkBlueSecondaryTextColor: "#273c75",
  greenSecondaryTextColor: "#27ae60",
  redSecondaryTextColor: "#e74c3c",
  yellowSecondaryTextColor: "#f1c40f",
  graySecondaryTextColor: "#5e5e5e",
  lightGraySecondaryTextColor: "#bdbdbd",

  // primaryGradientColor: ["#3396DF", "#5500CD"],
  primaryGradientColor: ["#407BFF", "#407BFF"],
  whiteGradientColor: ["#f3f9fb", "#eaedfc"],
  grayGradientColor: ["#bdbdbd", "#5e5e5e"],
  primaryShadowColor: "#2d3436",

  buttonGradientColor: ["#C58BF2", "#EEA4CE"],

  fontSize_xl: 24,
  fontSize_lg: 20,
  fontSize_md: 16,
  fontSize_sm: 14,
  fontSize_xs: 12,
  fontSize_xxs: 10,
  fontSizeHeader: 36,
  fontSizeSubTitle: 15,
  fontSizeTitle: 28,
  fontSizeNavigationHeader: 20,

  spacing_xs: 4,
  spacing_sm: 8,
  spacing_md: 10,
  spacing_lg: 16,
  spacing_xl: 24,
  spacing_xxl: 36,

  buttonActionWidth: 60,
  buttonActionHeight: 60,

  cardWidth: deviceData.getDeviceWidth() * 0.7,
  cardHeight: 180,

  newsWidth: deviceData.getDeviceWidth() * 0.7,
  newsHeight: 240,
  newsDetailWidth: deviceData.getDeviceWidth(),
  newsDetailHeight: 240,

  historyWidth: deviceData.getDeviceWidth() * 0.3,
  historyHeight: 180,

  border_width_xs: 0.5,
  border_width_sm: 1,
  border_width_md: 2,

  avatar_size: 64,

  night_background_color: "#00001C",
  tabBarHeight: 49,

  borderRadius: 12,
};