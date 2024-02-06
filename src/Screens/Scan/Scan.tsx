import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Dimensions
} from "react-native";
import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/Theme/Variables";
import { StatusBar } from "expo-status-bar";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
export interface IScanProps {
  onCaptureSuccess: (file: CameraCapturedPicture) => void;
}
interface inforPobs {
  ten: string,
  hoatChatChinh: string,
  SDK: string,
  SQD: string,
  xuatSu: string,
  congTy: string,
  diaChiSX: string,
}
interface History {
  name: string,
  date: number,
  month: number,
  year: number,
}
export function InforContainer({ infor }: { infor: inforPobs }) {
  return (
    <View style={styles.result_container}>
      <View style={styles.result_name}>
        <Text style={{ color: 'white', fontWeight: '500' }}>{infor.ten}</Text>
      </View>
      <View style={styles.result_infro}>
        <Text style={{ fontWeight: 'bold' }}>{infor.congTy}</Text>
        <View style={{ flexDirection: 'row', columnGap: 10 }}>
          <Text >SĐK: {infor.SDK}</Text>
          <Text>SQĐ: {infor.SQD}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: 'bold' }}>Main active ingredient </Text>
          <Text>{infor.hoatChatChinh}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: 'bold' }}>Address</Text>
          <Text>{infor.diaChiSX}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: 'bold' }}>Origin</Text>
          <Text>{infor.xuatSu}</Text>
        </View>
      </View>
    </View>

  )
}


export const Scan = (props: IScanProps) => {
  const { onCaptureSuccess } = props;

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [camera, setCamera] = useState<Camera | null>();
  const [type, setType] = useState(CameraType.back);
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false)
  const [resSucces, setResSucces] = useState<boolean>(false);
  const [errRes, setErrRes] = useState<boolean>(false);
  const [information, setInformation] = useState<inforPobs[]>([])
  const userID = "65c25e4d4a7017b0efb30dc9"
  const apiUpdate = "https://medifind-be.proudsea-d3f4859a.eastasia.azurecontainerapps.io/api/v1/historyMedicine/"
  async function updateHistory(arr: History[]) {
    try {
      const response = await fetch(apiUpdate + userID, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arr)
      })
      const data = await response.json();
      if (data.status === "success") {
        console.log("Update success")
      }
      else {
        await updateHistory(arr)
      }
    } catch (error) {
      console.error(error);
    }
  }
  const sendPictureToApi = async (uri: string) => {
    const apiBE = "https://medifind-be.proudsea-d3f4859a.eastasia.azurecontainerapps.io/api/v1/nlp"

    await setLoading(true);
    await setErrRes(false);
    const formData = new FormData();
    formData.append("file", {
      uri: uri,
      type: "image/jpeg",
      name: "image.jpg"
    } as any)
    console.log(formData);
    try {
      let response = await fetch(`${apiBE}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (!response.ok) {
        console.log("Picture upload fail", response.status);
        setLoading(false);
        setErrRes(true);
        setResSucces(false)
      }
      else {
        const data = await response.json();
        setLoading(false);
        setErrRes(false);
        setResSucces(true)
        await setInformation(data);
        let arr: History[] = [];
        await data.forEach((el: inforPobs) => {
          const date = new Date();
          arr.push({
            name: el.ten,
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
          })
        })
        await updateHistory(arr);
      }
    } catch (error) {
      console.error('Error sending picture to OCRmodel:', error);
      setLoading(false);
      setErrRes(true);
      setResSucces(false)
    }
  };

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
      //onCaptureSuccess(result);
      sendPictureToApi(result.uri);
    }

  };
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    delete (result as any).cancelled;

    if (!result.canceled) {
      sendPictureToApi(result.assets[0].uri)
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
        backgroundColor: "#FFFFFF",
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
        {loading === false && resSucces === false && errRes === false && (<Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />)}
        {loading === true && errRes === false && resSucces === false && (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading...</Text>
          </View>
        )}
        {
          loading === false && errRes === true && resSucces === false && (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text>There was any error please try again!</Text>
              <TouchableOpacity onPress={() => { setErrRes(false); setLoading(false); setResSucces(false) }}><Text>Again</Text></TouchableOpacity>
            </View>
          )
        }{
          loading === false && errRes === false && resSucces === true && (
            <View style={styles.resContainer}>
              <View style={{ width: width, padding: 20 }}>
                <Text style={{ fontWeight: 'bold' }}>{information.length} results have been found</Text>
              </View>
              <ScrollView >
                {information.map((el, index) => <InforContainer infor={el} key={index} />)}
              </ScrollView>
              <TouchableOpacity onPress={() => { setErrRes(false); setLoading(false); setResSucces(false) }} style={{ width: width * 8 / 10, height: 60, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#407BFF', marginTop: 10 }}><Text style={{ color: '#407BFF' }}>Again</Text></TouchableOpacity>
            </View>
          )
        }
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
  resContainer: {
    justifyContent: 'center', alignItems: 'center'
  },
  result_container: {
    width: width * 90 / 100,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#ADADAD',
    borderWidth: 1
  },
  result_name: {
    width: width * 90 / 100,
    backgroundColor: '#244EB9',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10
  },
  result_infro: {
    padding: 10,
    rowGap: 10
  }
});
