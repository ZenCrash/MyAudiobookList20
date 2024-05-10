import { View, Text, Platform, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import FileListComponent from '../components/fileListComponent2.js';

const ios = Platform.OS == 'ios';
var { width, height } = Dimensions.get('window')

export default function LibraryScreen() {
    return (
        <SafeAreaView className="flex-1 bg-neutral-800">
            {/* Header */}
            <View className="items-center mt-1 mb-1">
                <View className="" >
                    <Text className="text-white text-3xl font-bold">Library Screen</Text>
                </View>
            </View>
            {/* Spacer Line */}
            <View style={{ flex: 0, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

            {/* Body */}
            <View>
                <FileListComponent />
            </View>
        </SafeAreaView>
    );
}