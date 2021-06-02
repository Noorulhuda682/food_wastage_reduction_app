import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Alert
} from "react-native";

export const saveData = async (token) => {
    try {
      await AsyncStorage.setItem("token", token)
      return 'Data successfully saved';
    } catch (e) {
      Alert.alert('Failed to save the data to the storage')
    }
}

export const readData = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      return token
    } catch (e) {
      Alert.alert('Failed to fetch the data from storage')
    }
}

export const clearStorage = async () => {
    try {
      await AsyncStorage.clear()
      Alert.alert('Storage successfully cleared!')
    } catch (e) {
      Alert.alert('Failed to clear the async storage.')
    }
}