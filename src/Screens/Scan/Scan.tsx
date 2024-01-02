import React, { useState, useEffect } from "react";
import * as FileSystem from 'expo-file-system';
import { encode, decode } from 'base-64';
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
import { err } from "react-native-svg/lib/typescript/xml";

export interface IScanProps {
  onCaptureSuccess: (file: CameraCapturedPicture) => void;
}

export const Scan = (props: IScanProps) => {
  const { onCaptureSuccess } = props;

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [camera, setCamera] = useState<Camera | null>();
  const [type, setType] = useState(CameraType.back);
  const navigation = useNavigation();

  const sendPictureToApi = async (image: CameraCapturedPicture) => {
    const uri = image?.uri || "";
    const fileUri =
      Platform.OS === "android" ? uri : uri.replace("file://", "");
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];
    const uriPng = fileUri.replace(".jpg", ".png");
    const formData = new FormData();
    formData.append("photo", {
      uri: fileUri,
      file: `photo.jpg`,
      type: `image/jpeg`,
    } as any);
    const apiOcr = "https://medifind-ocr.proudsea-d3f4859a.eastasia.azurecontainerapps.io/process_image/";
    const apiBE = "/"
    try {
      let response = await fetch(`${apiOcr}`, {
        method: 'POST',
        body: formData,
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      if (!response.ok) {
        console.log("Picture upload fail", response.status);
      }
      else {
        console.log("upload succes");
      }
      /*
      else {
        try {
          let responseJson = await response.json();
          console.log(responseJson);
          let responseBE = await fetch(`${apiBE}`, {
            method: 'POST',
            body: responseJson,
            headers: {
              'content-type': 'application/json',
            },
          });
          if (!responseBE.ok) {
            console.log("Handle nlp fail", responseBE.body);
          }
          else {
            console.log("Success handle nlp", responseBE.body);
          }
        }
        catch (error) {
          console.log("Error sending data to BE", error);
        }
      }
      */
    }
    catch (error) {
      console.error('Error sending picture to OCRmodel:', error);
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
    console.log("helo")
    if (camera) {
      const result = await camera.takePictureAsync({
        skipProcessing: false,
      });
      onCaptureSuccess(result);
      //sendPictureToApi(result);
    }

  };



  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      onCaptureSuccess(result);
      //sendPictureToApi(result);

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
