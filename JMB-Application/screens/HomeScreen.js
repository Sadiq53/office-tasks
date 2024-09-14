// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/images/logo.png';

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
    <>
    <View style={styles.indexGrid}>
    <Image source={logo} style={styles.image} />
    </View>
    <View style={styles.bottomLayout}>
      <View style={styles.bottomHead}>
        <Text style={styles.myFont}>Login</Text>
      </View>
      <View style={styles.formLayout}>
        <Text style={styles.formText}>Email</Text>
        <TextInput placeholder='Enter email id' placeholderTextColor="gray" style={styles.formInput} />
        <Text style={styles.formText}>Password</Text>
        <TextInput placeholder='Enter password' placeholderTextColor="gray" style={styles.formInput} />
        {/* <Button onPress={navigation.navigate('/profile')} title='Go' /> */}
      </View>
     
      <TouchableOpacity style={styles.formButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
     
    </View>
    {/* <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={{flex : "1"}}>
          <Text style={{fontSize : "40"}}>{item._id}</Text>
        </View>
      )}
    /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexGrid: {
    flex : 1,
    gap : 0,
    // flexDirection : "row",
    padding : 20,
    justifyContent  :"center",
    alignItems : "center",
    
  },
  myFont : {
    fontSize : 40,
    color : "#fff",
    fontWeight : "600",
    textAlign : "center"

  },
  image : {
    width : 120,
    height : 100
  },
  bottomLayout : {
    backgroundColor : "red",
    flex : 1.5,
    borderTopLeftRadius : 35,
    borderTopRightRadius : 35,
    paddingHorizontal : 20,
    paddingVertical : 40,
    gap :40,
    // paddingBottom : 0
  },
  bottomHead : {
    textAlign : "center",
    flex : 0
  },
  formLayout : {
    flex : 0.8,
    gap : 8,
  },
  formText : {
    fontSize : 20,
    color : "#fff"
  },
  formInput : {
    backgroundColor  :"#fff",
    height : 50,
    borderRadius : 5,
    paddingHorizontal : 20,
    // paddingVertical : 20
    flex : 1
  },
  formButton : {
    backgroundColor : "yellow",
    padding : 10,
    borderRadius : 6,
    flex : 0
  },
  buttonText : {
    color : "black",
    textAlign : "center",
    fontSize : 20,
    paddingVertical : 4,
    fontFamily : "Poppins",
    fontWeight : "700"  
  }
});
