import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { FolderPlusIcon } from 'react-native-heroicons/outline';

export default function FileBrowserScreen() {
    const downloadFile = async () => {

    };

    return (
        <View>
            <TouchableOpacity className="flex-row bg-blue-500 py-2 px-4 rounded" onPress={downloadFile}>
                <FolderPlusIcon size="30" strokeWidth={2} color="white" />
                <Text className="text-white text-2xl"> Select Folder</Text>
            </TouchableOpacity>
        </View>
    );
}