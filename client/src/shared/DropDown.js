import React, {
  useState
} from 'react';
import {
  View,
  Text,
  // Button,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Spinner, Button, } from 'native-base';
import { Picker } from '@react-native-picker/picker';

const DropDownInput = ({ pickerItems, onChange, customeStyle, pickerStyle, selectedValue }) => {

  const [value, setValue] = useState(pickerItems[0]);


  return (

    <View style={[styles.pickerView, customeStyle]}>
      <Picker
        style={styles.picker}
        mode="dropdown"
        iosHeader="Select your SIM"
        iosIcon={<Icon name="arrow-down" />}
        placeholder="selecting"
        onValueChange={(newVal) => onChange(newVal)}
        selectedValue={selectedValue}
      >
        {
          pickerItems.map((item, i) => <Picker.Item key={i} style={
            pickerStyle ? pickerStyle : {}
          }
            label={item} value={item} />)
        }
      </Picker>
    </View>

  );
}

const styles = StyleSheet.create({
  pickerView: {
    marginTop: 20, borderRadius: 5,
    backgroundColor: '#e6e9ff',
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 1,
  },
  picker: {
    height: 53,
    marginTop: -3,
    borderRadius: 5
  }

})

export default DropDownInput;