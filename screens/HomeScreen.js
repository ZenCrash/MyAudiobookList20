import { View, Text, Platform, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'

const ios = Platform.OS == 'ios';
var { width, height } = Dimensions.get('window')

export default function HomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-neutral-800">
            {/* Header */}
            <View className="items-center mt-1 mb-1">
                <View className="" >
                    <Text className="text-white text-3xl font-bold">Home Screen</Text>
                </View>
            </View>
            {/* Spacer */}
            <View style={{ flex: 0, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

            {/* Body */}
            <View className="flex items-center justify-center bg-neutral-800">
                <ScrollView>

                </ScrollView>
            </View>
            <Text className="text-white text-4xl font-bold">Example Text</Text>
        </SafeAreaView>
    );
}