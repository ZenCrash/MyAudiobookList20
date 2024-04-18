import { View, Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'

const ios = Platform.OS == 'ios';

export default function HeaderComponent() {
    return (
        <View className=" bg-neutral-800" >
            {/* <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                <StatusBar />
                <View className="flex-row justify-between items-center">
                    <View className="ml-1">
                        <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    </View>
                    <Text className="text-white text-3xl font-bold">
                        MyAudiobookList
                    </Text>
                    <TouchableOpacity className="mr-l">
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView> */}

        </View>
    );
}