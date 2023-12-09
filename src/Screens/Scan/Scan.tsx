import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { User } from "@/Services";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/Theme/Variables";
import { StatusBar } from "expo-status-bar";

export interface IScanProps {
  onCaptureSuccess: (file: CameraCapturedPicture) => void;
}

export const Scan = (props: IScanProps) => {
  const { onCaptureSuccess } = props;

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [camera, setCamera] = useState<Camera | null>();
  const [type, setType] = useState(CameraType.back);
  const navigation = useNavigation();
  const sendPictureToApi = async (pictureData: CameraCapturedPicture) => {
    try {
      const response = await fetch('API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pictureData,
        }),
      });
      const data = await response.json();
      console.log('API response:', data);
    } catch (error) {
      console.error('Error sending picture to API:', error);
    }
  };
  // Use camera
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  // Use image picker
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Permission denied!");
        }
      }
    })();
  }, []);

  const handleTakePicture = async () => {
    if (camera) {
      const result = await camera.takePictureAsync({
        skipProcessing: false,
      });
      onCaptureSuccess(result);
      //   sendPictureToApi(result);
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      onCaptureSuccess(result);
      //   sendPictureToApi(result);
    }
  };

  const handlePressClose = () => {
    return navigation.goBack();
  };

  const handlePressReverse = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e6f6ff",
      }}
    >
      <View style={styles.header}>
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() => handlePressClose()}>
          <Ionicons
            name="close-outline"
            size={32}
            color={Colors.PRIMARY}
          ></Ionicons>
        </TouchableOpacity>
        <Text bold fontSize={18}>
          Scan a prescription
        </Text>
        <TouchableOpacity onPress={() => handlePressReverse()}>
          <Ionicons
            name="camera-reverse-outline"
            size={32}
            color={Colors.PRIMARY}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          onPress={() => handlePickImage()}
        >
          <Ionicons
            name="image-outline"
            size={32}
            color={Colors.PRIMARY}
          ></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scanContainer}
          onPress={() => handleTakePicture()}
        >
          <Ionicons
            name="scan-circle"
            size={64}
            color={Colors.PRIMARY}
          ></Ionicons>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  cameraContainer: {
    flex: 10,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    // aspectRatio: 0.9
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  scanContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    flex: 1,
  },
  textLarge: {
    fontSize: 25,
  },
});
