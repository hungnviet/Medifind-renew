import React, { useRef } from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { themeVariables } from "@/Theme";
import { LinearGradient } from "expo-linear-gradient";
import { RootScreens } from "..";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../../../assets/welcome_1.png"),
    title: "Know Every Pill\nYou Take",
    subtitle:
      "Scan your prescription and see  what you have to take.\nNo need to find information manually.\nMediFind take care all steps.",
  },
  {
    id: "2",
    image: require("../../../assets/welcome_2.png"),
    title: "Control Your\nConsumption",
    subtitle:
      "MediFind saves all your scanned pills\nto analyze the amount of drugs you have taken.\nYou will be protected from antibiotic abuse.",
  },
  {
    id: "3",
    image: require("../../../assets/welcome_3.png"),
    title: "Make Your Life Healthier\nMake Our World Better",
    subtitle:
      "Our mission is raising the attention about drug abuse,\nspecially antibiotic abuse.\nThe rising of antibiotic abuse is endangering out future.",
  },
];

interface ISlideProps {
  id: string;
  image: number;
  title: string;
  subtitle: string;
}

const Slide = (item: ISlideProps) => {
  return (
    <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
      <Image
        source={item.image}
        style={{ height: "72%", width, resizeMode: "contain" }}
      />
      <View style={{ justifyContent: "center", paddingLeft: 20 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );
};

export interface IWelcomeProps {
  onNavigate: (screen: RootScreens) => void;
}

export const Welcome = (props: IWelcomeProps) => {
  const { onNavigate } = props;
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = useRef<any>();
  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.07,
          justifyContent: "space-between",
        }}
      >
        {/* Indicator container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10
          }}
        >
          {/* Render indicator */}
          {slides.map((_, index) => (
            <LinearGradient
              key={index}
              colors={
                currentSlideIndex == index
                  ? themeVariables.primaryGradientColor
                  : themeVariables.grayGradientColor
              }
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  width: 15,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{ marginBottom: 10 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{ height: 50, alignItems: 'flex-end', paddingRight: 30 }}>
              <TouchableOpacity onPress={() => onNavigate(RootScreens.LOGIN)} style={{ width: 50 }}>
                <LinearGradient
                  colors={themeVariables.primaryGradientColor}
                  style={styles.btnStarted}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: themeVariables.fontSize_md,
                      color: themeVariables.whiteSecondaryColor,
                    }}
                  >
                    GO
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                ]}
                onPress={skip}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: themeVariables.fontSize_md,
                    color: themeVariables.blackSecondaryTextColor,
                  }}
                >
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}

              >
                <LinearGradient
                  colors={themeVariables.primaryGradientColor}
                  style={styles.btn}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: themeVariables.whiteSecondaryColor,
                      fontSize: themeVariables.fontSize_md,
                    }}
                  >
                    NEXT
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: themeVariables.backgroundColor }}
    >
      <StatusBar style="auto" />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.8 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => (
          <Slide
            id={item.id}
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
          />
        )}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: themeVariables.blackSecondaryTextColor,
    fontSize: themeVariables.fontSize_xs,
    marginTop: 10,
    maxWidth: '90%',
    lineHeight: 20,
    textAlign: 'left'
  },
  title: {
    color: themeVariables.blackSecondaryTextColor,
    fontSize: themeVariables.fontSize_lg,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "justify"
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  indicator: {
    height: 2.5,
    width: 10,
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    height: 65,
    width: 65,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btnStarted: {
    height: 65,
    width: 65,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
