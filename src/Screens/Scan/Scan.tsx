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
  dangBaoChe: string,
  diaChiSX: string,
}
export function InforContainer({ infor }: { infor: inforPobs }) {
  return (
    <View style={{
      backgroundColor: 'white', width: width * 8 / 9, borderRadius: 8, borderColor: '#F1F3F5', marginTop: 10, borderWidth: 2, paddingTop: 12, paddingLeft: 15, paddingRight: 15, shadowOffset: { width: -5, height: 5, },
      shadowColor: '#171717',
      shadowOpacity: 0.6,
      shadowRadius: 3,
    }}>
      <View style={{ flexDirection: 'column', justifyContent: 'space-around', width: '100%' }}>
        <Text style={{ fontSize: 18, textTransform: 'uppercase', fontWeight: 'bold' }}>{infor.ten}</Text>
        <Text style={{ fontSize: 12 }}>Hoạt chất chính: {infor.hoatChatChinh}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', columnGap: 15, width: '100%' }}>
        <Text style={{ fontSize: 12 }}>SĐK :{infor.SDK}</Text>
        <Text style={{ fontSize: 12 }}>SQĐ :{infor.SQD}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', columnGap: 15, width: '100%' }}>
        <Text style={{ fontSize: 12 }}>Xuất xứ:</Text>
        <Text style={{ fontSize: 12 }}>{infor.xuatSu}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', columnGap: 15, width: '100%' }}>
        <Text style={{ fontSize: 12 }}>Công ty:</Text>
        <Text style={{ fontSize: 12 }}>{infor.congTy}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', columnGap: 15, width: '100%' }}>
        <Text style={{ fontSize: 12 }}>Dạng bào chế:</Text>
        <Text style={{ fontSize: 12 }}>{infor.dangBaoChe}</Text>
      </View>
      <Text style={{ fontSize: 12 }}>Địa chỉ sản xuất:</Text>
      <Text style={{ fontSize: 12 }}>{infor.diaChiSX}</Text>
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

  const sendPictureToApi = async (uri: string) => {
    // const apiBE = "192.168.1.12:3000/api/v1/nlp"
    await setLoading(true);
    // const recognizedText = "STT Tén thude/ham lugng DVT 1 | Penicilin(duéi dang Phenoxymethylpenicilin Kali) Vin 400.000 UI (Pe iin (duéi dang Phenoxy methyl penicilin kali) Uédng , Sdng 2 Vien, Tria 2 Vien , Chiéu 2 Vien - 2 | Paracetamol (acetaminophen) 500mg (Mypara Vién 500) Uéng , Sang 1 Vién , Chiéu 1 Vien - S6 lugng 30"
    // const obj = { "ocrOutput": recognizedText };
    // const jsonString = await JSON.stringify(obj);
    // try {
    //   let res = await fetch(`${apiBE}`, {
    //     method: "POST",
    //     body: jsonString,
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   if (!res.ok) {
    //     console.log("Picture upload fail", res.status);
    //     setLoading(false);
    //     setErrRes(true);
    //     setResSucces(false)
    //   }
    //   else {
    //     const finalData = await res.json();
    //     await setInformation(finalData.data.result);
    //     setLoading(false);
    //     setErrRes(false);
    //     setResSucces(true)
    //   }
    // } catch (err) {
    //   console.error('Error get nlp result:', err);
    //   setLoading(false);
    //   setErrRes(true);
    //   setResSucces(false)
    // }

    const formData = new FormData();
    formData.append("file", {
      uri: uri,
      type: "image/jpeg",
      name: "image.jpg"
    } as any)
    console.log(formData);
    const apiOcr = "https://medifind-ocr.proudsea-d3f4859a.eastasia.azurecontainerapps.io/process_image";
    const apiBE = "localhost:3000/api/v1/nlp"
    try {
      let response = await fetch(`${apiOcr}`, {
        method: 'POST',
        body: formData,
        headers: {
          // 'accept': 'application/json',
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
        // setLoading(false);
        // setErrRes(false);
        // setResSucces(true)
        const recognizedText = data.results; // Extract the recognized text
        const obj = { "ocrOutput": recognizedText };
        const jsonString = await JSON.stringify(obj);
        try {
          let res = await fetch(`${apiBE}`, {
            method: "POST",
            body: jsonString,
            headers: {
              'Content-Type': 'application/json'
            }
          })
          if (!res.ok) {
            console.log("Picture upload fail", res.status);
            setLoading(false);
            setErrRes(true);
            setResSucces(false)
          }
          else {
            const finalData = await res.json();
            await setInformation(finalData.data.result);
            setLoading(false);
            setErrRes(false);
            setResSucces(true)
          }
        } catch (err) {
          console.error('Error get nlp result:', err);
          setLoading(false);
          setErrRes(true);
          setResSucces(false)
        }


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
              <Text>Result</Text>
              <ScrollView>
                {information.map((el, index) => <InforContainer infor={el} key={index} />)}
              </ScrollView>
              <TouchableOpacity onPress={() => { setErrRes(false); setLoading(false); setResSucces(false) }}><Text>Again</Text></TouchableOpacity>
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
  }
});
