import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const MusicPlayerComponent = ({ route }) => {
    const navigation = useNavigation();
    const { item, files } = route.params;

    return (
        <SafeAreaView className="flex-1 bg-neutral-800">
            <TouchableOpacity className="pl-3 pt-1" onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-circle-outline" size={24} color="gray" />
            </TouchableOpacity>
            <View>
                {console.log(item.name)}
                <Text className="text-white text-2xl text-center">{item.name.split(".")[0]}</Text>
                <Image source={{ uri: item.cover }} style={{ height: 200, width: 200 }} />
            </View>
        </SafeAreaView>
    );
}

export default MusicPlayerComponent;