import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, ScrollView, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-web';
import { NativeWindStyleSheet } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import SimpleIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as MediaLibrary from 'expo-media-library';

const FileListComponent = () => {
    /* ---------------------------------------------------------------------- */
    /* properties */
    /* ---------------------------------------------------------------------- */

    const [selectedDirectory, setSelectedDirectory] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [directorys, setDirectorys] = useState([]);
    const [files, setFiles] = useState([]);
    const navigation = useNavigation();
    const [ExternalStorageNames, setExternalStorageNames] = useState([]);
    const [uriNvigationPartList, setUriNavigationPartList] = useState([]);
    const sdCardPath = "file:///storage/";
    const internalStoragePath = "file:///storage/emulated/0";

    /* ---------------------------------------------------------------------- */
    /* Click Events */
    /* ---------------------------------------------------------------------- */

    //click evenets
    const handleClickFolder = async (item) => {
        setSelectedDirectory(item);
        getNavigationComponent(item);
        // console.log("(folderclick) Selected Directory:   ", selectedDirectory);
    };

    const handleClickFile = async (item) => {
        console.log("You clicked a file with the path: ", item);
        navigation.navigate("MusicPlayer", { item, files })
    };



    /* ---------------------------------------------------------------------- */
    /* Use Effcts */
    /* ---------------------------------------------------------------------- */

    //use effects
    useEffect(() => {
        // console.log("(useeffect)   Selected Directory:   ", selectedDirectory);
        if (selectedDirectory !== "") {
            fetchExternalStorageNames(); //TODO Remove
            console.log("(useEffect) Selected Directory:   ", selectedDirectory);
            getFoldersAndFiles(selectedDirectory);
        }

    }, [selectedDirectory]);

    useEffect(() => {
        fetchExternalStorageNames();
    }, [])

    /* ---------------------------------------------------------------------- */
    /* Methods */
    /* ---------------------------------------------------------------------- */

    //gets all external storages //TODO needs to be refactored in future
    const fetchExternalStorageNames = async () => {
        const permission = await MediaLibrary.getPermissionsAsync();

        if (permission.status === "granted") {
            const albums = await MediaLibrary.getAlbumsAsync();
            const albumList = [];
            const uniqueNames = new Set();

            for (const album of albums) {
                const assets = await MediaLibrary.getAssetsAsync({
                    mediaType: MediaLibrary.MediaType.audio,
                    album: album.id
                });
                albumList.push(...assets.assets.map(asset => asset.uri));
            }
            albumList.forEach(url => {
                match = url.match(/file:\/\/\/storage\/([^\/]+)/);
                if (match) {
                    uniqueNames.add(match[1]);
                }
            });

            const filteredNames = new Set([...uniqueNames].filter(item => item !== "emulated"));
            setExternalStorageNames(filteredNames)

            console.log("External Storage Names: ", filteredNames);
        } else {
            console.log("Permission not granted.");
            // Handle the case where permission is not granted
        }
    }

    //Get Folders
    const getFoldersAndFiles = async (directory) => {
        const permission = await MediaLibrary.getPermissionsAsync();

        if (permission.status === 'granted') {
            try {
                const { exists, isDirectory, uri } = await FileSystem.getInfoAsync(directory);

                //gets all unique uris
                const albums = await MediaLibrary.getAlbumsAsync();


                if (exists) {
                    if (isDirectory) {
                        const items = await FileSystem.readDirectoryAsync(uri);
                        const folderData = [];
                        const fileData = [];

                        for (const item of items) {
                            const { exists: isItemExists, isDirectory: isItemDirectory } = await FileSystem.getInfoAsync(`${directory}/${item}`);
                            if (isItemExists) {
                                if (isItemDirectory) {
                                    folderData.push({
                                        name: item,
                                        path: `${directory}/${item}`,
                                        isDirectory: true,
                                    });
                                }
                                else {
                                    const fileExtension = item.split('.').pop().toLowerCase();
                                    if (fileExtension === "mp3" ||
                                        fileExtension === "mp4" ||
                                        fileExtension === "m4a" ||
                                        fileExtension === "m4b") {

                                        fileData.push({
                                            name: item,
                                            path: `${directory}/${item}`,
                                            isDirectory: false,
                                            fileType: fileExtension,
                                        })
                                    }
                                }
                            }
                        }
                        setFiles(fileData);
                        setDirectorys(folderData.concat(fileData));
                    }
                }
            } catch (error) {
                console.error('Error reading directory:', error);
            }
        }
        else {
            console.log("Permission denied to access directory: ", directory);
        }
    }

    //navigation string splitter
    const getNavigationComponent = async (item) => {
        const firstInitialPartPath = "file:///storage";
        const secondInitialPartPath = firstInitialPartPath + "/emulated/0";
        const internalStorage = (item.includes(secondInitialPartPath)) ? true : false;
        let parts = [];
        const partList = [];

        if (internalStorage) {
            parts = item.replace(secondInitialPartPath, "Storage").split('/').filter(part => part !== "");
        }
        else {
            parts = item.replace(firstInitialPartPath, "Storage").split('/').filter(part => part !== "");
        }

        parts.forEach((part, index) => {
            let newPath = (internalStorage) ? secondInitialPartPath : firstInitialPartPath;
            for (let i = 1; i <= index; i++) {
                newPath += "/" + item[i];
            }

            partList.push({
                title: part,
                path: newPath,
            });
        });

        setUriNavigationPartList(partList);
        console.log("NAVIGATION:", partList);
    }

    /* ---------------------------------------------------------------------- */
    /* View */
    /* ---------------------------------------------------------------------- */

    return (
        <View className="flex-auto mb-10">

            {/* Root directory checker */}
            {(selectedDirectory === "") ?
                <View className="flex-auto">
                    <View className="" style={{ backgroundColor: "#404040" }}>
                        <View className="flex-row ml-3 mb-1 mt-1">
                            <Text className="text-white">Storage</Text>
                        </View>
                    </View>
                    <View className="ml-3 mt-3">
                        <Pressable className="flex-row items-center" onPress={() => handleClickFolder(internalStoragePath)}>
                            <MaterialCommunityIcons name="cellphone" size={30} color="royalblue" />
                            {/* <Ionicon name='phone-portrait-sharp' color="royalblue" size={30} /> */}
                            <Text className="text-white text-2xl">Internal Storage</Text>
                        </Pressable>
                        {(ExternalStorageNames > 1) ?
                            <FlatList
                                data={ExternalStorageNames}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            <Pressable className="flex-row items-center" onPress={() => handleClickFolder(sdCardPath + item)}>
                                                <MaterialCommunityIcons name="sd" size={30} color="royalblue" />
                                                <Text className="text-white text-2xl">{item}</Text>
                                            </Pressable>
                                        </View>
                                    );
                                }}
                            />
                            :
                            <View>
                                <Pressable className="flex-row items-center" onPress={() => {
                                    const externalStorageArray = Array.from(ExternalStorageNames);
                                    const firstExternalStorage = externalStorageArray[0];
                                    handleClickFolder(sdCardPath + firstExternalStorage)
                                }}>
                                    <MaterialCommunityIcons name="sd" size={30} color="royalblue" />
                                    <Text className="text-white text-2xl">{ExternalStorageNames}</Text>
                                </Pressable>
                            </View>
                        }
                        {/* {ExternalStorageNames.map((item) => {
                            return (
                                <Pressable className="flex-row items-center" onPress={() => handleClickFolder(sdCardPath + item)}>
                                    <MaterialCommunityIcons name="sd" size={30} color="royalblue" />
                                    <Text className="text-white text-2xl">{item}</Text>
                                </Pressable>
                            );
                        })} */}
                    </View>
                </View>
                :

                //Sub Directory
                <View className="flex-auto">
                    <View className="mb-2" style={{ backgroundColor: "#404040" }}>
                        <View className="flex-row ml-3 mb-1 mt-1">
                            <Pressable onPress={() => handleClickFolder("")}>
                                <View className="flex-row">
                                    {/* <Text className="text-white">{selectedDirectory.replace("file:///storage", "Storage")}</Text> */}
                                    {uriNvigationPartList.map((item, index) => {
                                        <Pressable key={index} onPress={() => handleClickFolder(item.path)}>
                                            <Text>{item.title} </Text>
                                        </Pressable>
                                    })}
                                </View>
                            </Pressable>
                        </View>
                    </View>
                    {/* <Text className="text-gray-600 text-2xl text-center">{directorys.length} Items</Text> */}
                    {/* Folders and files */}
                    <View className="">
                        {/* Folders */}
                        <View>
                            <FlatList
                                className="pt-3"
                                data={directorys}
                                renderItem={({ item }) => {
                                    return (
                                        <View className="ml-3">
                                            {(item.isDirectory) ?
                                                <Pressable className="flex-row items-center mb-1" onPress={() => handleClickFolder(item.path)}>
                                                    <MaterialCommunityIcons name="folder" size={30} color="goldenrod" />
                                                    <View>
                                                        <Text className="text-white text-2xl"> {item.name}</Text>
                                                        {/* <Text className=" text-gray-400"> {item.path}</Text> */}
                                                    </View>
                                                </Pressable>
                                                :
                                                <Pressable className="flex-row items-center mb-1" onPress={() => handleClickFile(item)}>
                                                    <MaterialCommunityIcons name='music' color="blueviolet" size={30} />
                                                    <View>
                                                        <Text className="text-white text-2xl"> {item.name}</Text>
                                                        {/* <Text className=" text-gray-400"> {item.path}</Text> */}
                                                    </View>
                                                </Pressable>
                                            }

                                        </View>
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                                ListFooterComponent={<Text></Text>}
                                ListEmptyComponent={<Text className="text-gray-500 text-2xl text-center">Folder is empty</Text>}
                            />
                        </View>
                    </View>
                </View>}
        </View>
    )
}

export default FileListComponent;
