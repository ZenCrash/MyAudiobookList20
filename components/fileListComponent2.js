import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Ionicon from 'react-native-vector-icons/Ionicons';

//Main
const FileListComponent = () => {
    const [selectedDirectory, setSelectedDirectory] = useState("file:///sdcard/");
    const [selectedFile, setSelectedFile] = useState();
    const [directorys, setDirectorys] = useState([]);
    const [files, setFiles] = useState([]);

    //click evenets
    const handleClickFolder = async (item) => {
        setSelectedDirectory(item);
        console.log(selectedDirectory);
    };
    const handleClickFile = () => {
        setSelectedFile("NewFile")
    };

    //use effects
    useEffect(() => {
        setSelectedDirectory(selectedDirectory);
        console.log(selectedDirectory);
        getFilesAndFolders(selectedDirectory);
    }, [selectedDirectory]);

    const getFilesAndFolders = async (directory) => {
        try {
            const { exists, isDirectory, uri } = await FileSystem.getInfoAsync(directory);
            if (exists) {
                if (isDirectory) {
                    const folders = await FileSystem.readDirectoryAsync(uri);
                    const folderData = folders.map(folder => ({
                        name: folder.split('/').pop(),
                        path: `${directory}${folder}`
                    }));
                    setDirectorys(folderData);
                } else {
                    const files = await FileSystem.readDirectoryAsync(uri);
                    const fileData = files.map(file => ({
                        name: file.split('/').pop(),
                        path: `${Directory}${file}`
                    }));
                    setFiles(fileData);
                }
            }

        } catch (error) {
            console.error('Error reading directory:', error);
        }
    }

    //View
    console.log(directorys.length);

    return (
        <View className="">
            <View className="mb-2" style={{ backgroundColor: "#404040" }}>
                <View className="ml-3  mb-1 mt-1">
                    {selectedDirectory === "/" ? <Text>{"Storage >"}</Text> :
                        selectedDirectory
                            .replace("file:///", "")
                            .split("/")
                            .reduce((acc, curr) => {
                                acc.push([curr, (acc.at(-1)) ? `${acc.at(-1)[1]}/${curr}` : curr])
                                console.log(acc);
                                return acc;
                            }, [])
                            .map((paths) => {
                                const [name, path] = paths;
                                return <Pressable key={path} onPress={() => handleClickFolder(`file:///${path}`)}>
                                    <Text className="text-white text-1xl">{name}</Text>
                                </Pressable>
                            })
                    }
                </View>
            </View>

            {/* Spacer
            <View className=" mt-2 mb-2" style={{ flex: 0, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} /> */}

            <Text className="text-white text-2xl underline">Folders:</Text>
            <FlatList
                data={directorys}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Pressable className="ml-3 flex-row items-center mb-1" onPress={() => handleClickFolder(item.path)}>
                                <Ionicon name='folder-open' color="royalblue" size={30} />
                                <Text className="text-white text-2xl"> {item.name}</Text>
                            </Pressable>
                        </View>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />
            <Text className="text-white text-2xl underline">Files:</Text>
            <FlatList
                data={files}
                renderItem={({ item }) => {
                    return (
                        <Pressable className="ml-3 flex-row items-center">
                            <Ionicon name='document' color="royalblue" size={30} />
                            <Text className="text-white text-2xl"> {item.name}</Text>
                        </Pressable>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />


        </View>
    )
}

export default FileListComponent;