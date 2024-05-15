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

const FileListComponent = () => {
    /* ---------------------------------------------------------------------- */
    /* properties */
    /* ---------------------------------------------------------------------- */

    const [selectedDirectory, setSelectedDirectory] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [directorys, setDirectorys] = useState([]);
    const [files, setFiles] = useState([]);

    /* ---------------------------------------------------------------------- */
    /* Click Events */
    /* ---------------------------------------------------------------------- */

    //click evenets
    const handleClickFolder = async (item) => {
        setSelectedDirectory(item);
        // console.log("(folderclick) Selected Directory:   ", selectedDirectory);
    };

    const handleClickFile = async (item) => {
        console.log("You clicked a file with the path: ", item);
        const navigation = useNavigation();
    };



    /* ---------------------------------------------------------------------- */
    /* Use Effcts */
    /* ---------------------------------------------------------------------- */

    //use effects
    useEffect(() => {
        // console.log("(useeffect)   Selected Directory:   ", selectedDirectory);
        if (selectedDirectory !== "") {

            console.log("(useEffect) Selected Directory:   ", selectedDirectory);
            getFoldersAndFiles(selectedDirectory);
        }

    }, [selectedDirectory]);

    /* ---------------------------------------------------------------------- */
    /* Methods */
    /* ---------------------------------------------------------------------- */

    //Get Folders
    const getFoldersAndFiles = async (directory) => {
        try {
            const { exists, isDirectory, uri } = await FileSystem.getInfoAsync(directory);
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

    /* ---------------------------------------------------------------------- */
    /* View */
    /* ---------------------------------------------------------------------- */

    return (
        <View className="flex-auto mb-10">

            {/* Root directory checker */}
            {(selectedDirectory === "") ?
                <View className="flex-auto">
                    <View className="" style={{ backgroundColor: "#404040" }}>
                        <View className="flex-row ml-3">
                            <Text className="text-white">Storage</Text>
                        </View>
                    </View>
                    <View className="ml-3 mt-3">
                        <Pressable className="flex-row items-center" onPress={() => handleClickFolder("file:///storage/1620-300F")}>
                            <MaterialCommunityIcons name="sd" size={30} color="royalblue" />
                            {/* <Ionicon name='phone-portrait-sharp' color="royalblue" size={30} /> */}
                            <Text className="text-white text-2xl"> SD Card</Text>
                        </Pressable>
                    </View>
                </View>
                :

                //Sub Directory
                <View className="flex-auto">
                    <View className="mb-2" style={{ backgroundColor: "#404040" }}>
                        <View className="flex-row ml-3 mb-1 mt-1">
                            <Pressable onPress={() => handleClickFolder("")}>
                                <View className="flex-row">
                                    <Text className="text-white">{"Storage "} </Text>
                                    <Text className="text-white">{selectedDirectory}</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                    {/* <Text className="text-gray-600 text-2xl text-center">{directorys.length} Items</Text> */}
                    {/* Folders and files */}
                    <View className="ml-3">
                        {/* Folders */}
                        <View>
                            <FlatList
                                className="pt-3"
                                data={directorys}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            {(item.isDirectory) ?
                                                <Pressable className="flex-row items-center mb-1" onPress={() => handleClickFolder(item.path)}>
                                                    <MaterialCommunityIcons name="folder" size={30} color="goldenrod" />
                                                    <View>
                                                        <Text className="text-white text-2xl"> {item.name}</Text>
                                                        {/* <Text className=" text-gray-400"> {item.path}</Text> */}
                                                    </View>
                                                </Pressable>
                                                :
                                                <Pressable className="flex-row items-center mb-1" onPress={() => handleClickFile(item.path)}>
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
                            />
                        </View>
                    </View>
                </View>}
        </View>
    )
}

export default FileListComponent;
