import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Ionicon from 'react-native-vector-icons/Ionicons';

const FileListComponent = () => {
    const [directory, setDirectory] = useState("/");
    const [selectedFile, setSelectedFile] = useState();

    const handleClickFolder = () => {
        setDirectory("NewDirectory")
    };
    const handleClickFile = () => {
        setSelectedFile("NewFile")
    };


    return (
        <View className="">
            <View className="mb-2" style={{ backgroundColor: "#404040" }}>
                <Text className="ml-3 text-white text-1xl mb-1 mt-1">
                    {directory === "/" ? "Storage >" : directory.replace("/", " > ")}
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
        </View>
    )
}

export default FileListComponent;