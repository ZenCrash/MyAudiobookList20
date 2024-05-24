import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Button, FlatList, Pressable } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const FileListComponent = () => {
    const [albums, setAlbums] = useState([]);
    const [folders, setFolders] = useState([]);
    const [permissionResponse, setPermissionResponse] = useState();

    const handleButtonPress = async () => {
        getPermission();
    }



    // Get permission
    const getAlbums = async () => {
        const permission = await MediaLibrary.getPermissionsAsync();

        if (permission.status === 'granted') {
            console.log("permission.status1: ", permission.status);
            const albums = await MediaLibrary.getAlbumsAsync();
        }
        else {
            console.log("permission.status2: ", permission.status);
            const newPermission = await MediaLibrary.requestPermissionsAsync();
            setPermissionResponse(newPermission);
        }
    }

    /* Main View */
    return (
        <SafeAreaView>
            <Button title='Add Library' onPress={getAlbums} />
            <FlatList
                className="pt-3"
                data={folders}
                renderItem={({ item }) => {
                    return (
                        <View className="ml-3">
                            <MaterialCommunityIcons name='folder' color="blueviolet" size={30} />
                            <View>
                                <Text className="text-white text-2xl"> {item.title}</Text>
                                {/* <Text className=" text-gray-400"> {item.path}</Text> */}
                            </View>
                        </View>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={<Text></Text>}
                ListEmptyComponent={<Text className="text-gray-500 text-2xl text-center">Folder is empty</Text>}
            />
        </SafeAreaView>
    )
}

export default FileListComponent;