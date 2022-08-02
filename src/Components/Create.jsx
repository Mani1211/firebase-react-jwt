// prettier-ignore
import {  Button, Flex, FormLabel, Input,Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  IoCheckmark,
  IoCloudUpload,
  IoTrash,
  IoWarning,
} from "react-icons/io5";
import {getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage'
import { getAnalytics, logEvent } from "firebase/analytics";
import { firebaseApp } from "../firebase-config";
import { fetchUser } from "../utils/fetchUser";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AlertMsg from "./AlertMsg";
import Spinner from "./Spinner";

const Create = () => {
const analytics = getAnalytics(firebaseApp);

  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.900", "gray.50");
  const [title, setTitle] = useState("");
  const [videoAsset, setVideoAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(1);
  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertIcon, setAlertIcon] = useState(null);

  const [userInfo] = fetchUser();
  const navigate = useNavigate();

  const storage = getStorage(firebaseApp);
  const fireStoreDb = getFirestore(firebaseApp);

  const uploadImage = (e) => {
    setLoading(true);
    const videoFile = e.target.files[0];
    const storageRef = ref(storage, `Videos/${Date.now()}-${videoFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(uploadProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoAsset(downloadURL);
          setLoading(false);
          setAlert(true);
          setAlertStatus("success");
          setAlertIcon(<IoCheckmark fontSize={25} />);
          setAlertMsg("Your video is uploaded to our server");
          setTimeout(() => {
            setAlert(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    const deleteRef = ref(storage, videoAsset);
    deleteObject(deleteRef)
      .then(() => {
        setVideoAsset(null);
        setAlert(true);
        setAlertStatus("error");
        setAlertIcon(<IoWarning fontSize={25} />);
        setAlertMsg("Your video was removed from our server");
        logEvent(analytics, 'video_deleted')

        setTimeout(() => {
          setAlert(false);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  const uploadDetails = async () => {
    try {
      setLoading(true);
      if (!title  && !videoAsset) {
        setAlert(true);
        setAlertStatus("error");
        setAlertIcon(<IoWarning fontSize={25} />);
        setAlertMsg("Required Fields are missing!");
        setTimeout(() => {
          setAlert(false);
        }, 4000);
        setLoading(false);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          userId: userInfo?.uid,
          videoUrl: videoAsset,
        };

        await setDoc(doc(fireStoreDb, "videos", `${Date.now()}`), data);
        setLoading(false);
        logEvent(analytics, 'video_uploaded')
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    logEvent(analytics, 'create_videopage_visited')
  }, [title]);

  return (
    <Flex
      justifyContent={"center"}
      alignItems="center"
      width={"full"}
      minHeight="100vh"
      padding={10}
    >
      <Flex
        width={"80%"}
        height="full"
        border={"1px"}
        borderColor="gray.300"
        borderRadius={"md"}
        p="4"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        gap={2}
      >
        
        {alert && (
          <AlertMsg status={alertStatus} msg={alertMsg} icon={alertIcon} />
        )}
        <Input
          variant={"flushed"}
          placeholder="Title"
          focusBorderColor="gray.400"
          isRequired
          errorBorderColor="red"
          type={"text"}
          _placeholder={{ color: "gray.500" }}
          fontSize={20}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Flex
          justifyContent={"space-between"}
          width="full"
          alignItems={"center"}
          gap={8}
          my={4}
        >
        </Flex>

        {/* File Selection */}
        <Flex
          border={"1px"}
          borderColor="gray.500"
          height={"400px"}
          borderStyle="dashed"
          width="full"
          borderRadius={"md"}
          overflow="hidden"
          position={"relative"}
        >
          {!videoAsset ? (
            <FormLabel width="full">
              <Flex
                direction={"column"}
                alignItems="center"
                justifyContent={"center"}
                height="full"
                width={"full"}
              >
                <Flex
                  direction={"column"}
                  alignItems="center"
                  justifyContent={"center"}
                  height="full"
                  width={"full"}
                  cursor="pointer"
                >
                 {loading ? (
                    <Spinner msg={"Uploading Your Video"} progress={progress} />
                  ) : (
                    <>
                      <IoCloudUpload
                        fontSize={30}
                        color={`${colorMode == "dark" ? "#f1f1f1" : "#111"}`}
                      />
                      <Text mt={5} fontSize={20} color={textColor}>
                        Click to upload
                      </Text>
                    </>
                  )}
                </Flex>
              </Flex>

              {!loading && (
                <input
                  type={"file"}
                  name="upload-image"
                  onChange={uploadImage}
                  style={{ width: 0, height: 0 }}
                  accept="video/mp4,video/x-m4v,video/*"
                />
              )}
            </FormLabel>
          ) : (
            <Flex
              width={"full"}
              height="full"
              justifyContent={"center"}
              alignItems={"center"}
              bg="black"
              position={"relative"}
            >
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                width={"40px"}
                height={"40px"}
                rounded="full"
                bg={"red"}
                top={5}
                right={5}
                position={"absolute"}
                cursor={"pointer"}
                zIndex={10}
                onClick={deleteImage}
              >
                <IoTrash fontSize={20} color="white" />
              </Flex>

              <video
                src={videoAsset}
                controls
                style={{ width: "100%", height: "100%" }}
              />
            </Flex>
          )}
        </Flex>

        <Button
          isLoading={loading}
          loadingText="Uploading"
          colorScheme={"linkedin"}
          variant={`${loading ? "outline" : "solid"}`}
          width={"xl"}
          _hover={{ shadow: "lg" }}
          fontSize={20}
          onClick={() => uploadDetails()}
        >
          Upload
        </Button>
      </Flex>
    </Flex>
  );
};

export default Create;
