// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen() {
  const { logout } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [data, setData] = useState([])

  const handleLogout = () => {
    logout();
    AsyncStorage.removeItem('UserToken')
    navigation.replace('Login');
  };

  const getData = async() =>{
    const response = await fetch('http://localhost:8080/admin/data', {
      method: "GET"
  });
  if (!response.ok) {
      throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  let filteredData = data?.fileData;
  const files = filteredData.map(({ data }) => data).flat();
  setData(files)
  }

  useEffect(()=>{
    getData()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
      {
        data?.map(value => (
          <Text>{value.AGREEMENTNO}</Text>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
