import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Ionicon from 'react-native-vector-icons/Ionicons';

//Get all Files and folders
// const getFilesAndFolders = async () => {
//     const [folders, setFolders] = useState;

//     try {
//         const { exists, isDirectory, uri} = await FileSystem.getInfoAsync("/");
//         if (exists){
//             if (isDirectory){

//             }
//             else{
//                 setFiles = 
//             }
//         }
//     }
//     catch {
//         console.error("Fetching files and folder dident failed!")
//     }

// }

//Main
const FileListComponent = () => {
    const [selectedDirectory, setSelectedDirectory] = useState("file:///sdcard/");
    const [selectedFile, setSelectedFile] = useState();
    const [directorys, setDirectorys] = useState([]);
    const [files, setFiles] = useState([]);

    //click evenets
    const handleClickFolder = () => {
        setDirectory("NewDirectory")
    };
    const handleClickFile = () => {
        setSelectedFile("NewFile")
    };

    //use effects
    useEffect(() => {
        getFilesAndFolders(selectedDirectory);
    }, []);

    const getFilesAndFolders = async (Directory = "file:///sdcard/") => {
        try {
            const { exists, isDirectory, uri } = await FileSystem.getInfoAsync(Directory);
            if (exists) {
                if (isDirectory) {
                    const folders = await FileSystem.readDirectoryAsync(uri);
                    setDirectorys(folders);
                } else {
                    const files = await FileSystem.readDirectoryAsync(uri);
                    setFiles(files);
                }
            }
        } catch (error) {
            console.error('Error reading directory:', error);
        }
    }

    //View
    console.log("hihi");

    return (
        <View className="">
            <View className="mb-2" style={{ backgroundColor: "#404040" }}>
                <Text className="ml-3 text-white text-1xl mb-1 mt-1">
                    {selectedDirectory === "/" ? "Storage >" : selectedDirectory.replace("/", " > ")}
                </Text>
            </View>
            <Pressable className="ml-3 flex-row items-center mb-1">
                <Ionicon name='folder-open' color="royalblue" size={30} />
                <Text className="text-white text-2xl"> FolderName</Text>
            </Pressable>
            <Pressable className="ml-3 flex-row items-center">
                <Ionicon name='document' color="royalblue" size={30} />
                <Text className="text-white text-2xl"> FileName</Text>
            </Pressable>

            {/* Spacer */}
            <View className=" mt-2 mb-2" style={{ flex: 0, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

            <Text className="text-white text-2xl underline">Folders:</Text>
            <FlatList
                data={directorys}
                renderItem={({ item }) => {
                    const folderName = item.split('/').pop();
                    return (
                        <View>
                            <Text className="text-white text-1xl">+ {item}</Text>
                        </View>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />
            <Text className="text-white text-2xl underline">Files:</Text>
            <FlatList
                data={files}
                renderItem={({ item }) => {
                    const fileName = item.split('/').pop();
                    return (
                        <View>
                            <Text className="text-white text-1xl">- {item}</Text>
                        </View>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />


        </View>
    )
}

export default FileListComponent;