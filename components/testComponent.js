import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

export default function App() {
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [audioFiles, setAudioFiles] = useState([]);
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.getPermissionsAsync();
            setPermissionGranted(status === 'granted');
            if (status === 'granted') {
                fetchFolders();
            }
        })();
    }, []);

    const fetchFolders = async () => {
        const albums = await MediaLibrary.getAlbumsAsync();
        setFolders(albums);
    };

    const fetchAudioFiles = async (folderId) => {
        const media = await MediaLibrary.getAssetsAsync({
            mediaType: MediaLibrary.MediaType.audio,
            album: folderId,
        });
        setAudioFiles(media.assets);
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            {permissionGranted ? (
                <>
                    <Text>Select a folder to display audio files:</Text>
                    <FlatList
                        data={folders}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Button
                                title={item.title}
                                onPress={() => fetchAudioFiles(item.id)}
                            />
                        )}
                    />
                    <Text>Audio Files:</Text>
                    <FlatList
                        data={audioFiles}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <Text>{item.filename}</Text>}
                    />
                </>
            ) : (
                <Text>Permission to access media library is required.</Text>
            )}
        </View>
    );
}