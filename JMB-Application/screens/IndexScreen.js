import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { handleGetData, handleGetUserData } from '../services/UserDataService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IndexScreen = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [holdVehicles, setHoldVehicles] = useState([]);
    const [releaseVehicles, setReleaseVehicles] = useState([]);
    const [inYardVehicles, setInYardVehicles] = useState([]);
    const [userData, setUserData] = useState([]);
    const ID = AsyncStorage.getItem('UserToken')
  
    // Fetch data when the component mounts
    useEffect(() => {
      async function setData () {
        const data = await handleGetData()
        const files = data.map(({ data }) => data).flat();
        const holdFileData = files?.filter(value => value.ACTION === 'Hold')
        const releaseFileData = files?.filter(value => value.ACTION === 'Release')
        const yardFileData = files?.filter(value => value.ACTION === 'In Yard')
        setHoldVehicles(holdFileData)
        setReleaseVehicles(releaseFileData)
        setInYardVehicles(yardFileData)
      }
      setData()
    }, []);

    const handleGetUserData = async(id) =>{
      const response = await fetch(`https://jmb-server.onrender.com/admin/login/:${id}`, {
        method : "GET"
      })
      console.log(response)
      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data)
      return data?.result
  }

    useEffect(()=>{
      async function userData() {
        const data = await handleGetUserData(ID)
        setUserData(data)
      }
      userData()
    }, [])
    
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.nameText}>{userData ? userData?.member_name : ''}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={20} color="black" />
          <Text style={styles.locationText}>Your Location</Text>
        </View>
      </View>

      <Text style={styles.subText}>Search vehicle by chassis or vehicle number</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>

      <View style={styles.grid}>
        <StatusCard title="Pending" count={100} color="#ff5c5c" />
        <StatusCard title="In Yard" count={inYardVehicles?.length} color="#00d9a4" />
        <StatusCard title="Release" count={releaseVehicles?.length} color="#6ecfff" />
        <StatusCard title="Hold" count={holdVehicles?.length} color="#ffbf2f" />
      </View>
    </ScrollView>
  );
};

const StatusCard = ({ title, count, color }) => {
  return (
    <View style={[styles.card, { borderColor: color }]}>
      <Ionicons name="swap-horizontal" size={40} color={color} />
      <Text style={[styles.cardCount, { color }]}>{count}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#e32636',
    padding: 20,
    paddingTop: 50,
  },
  welcomeText: {
    color: 'white',
    fontSize: 20,
  },
  nameText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  locationText: {
    color: 'yellow',
    fontSize: 16,
    marginLeft: 5,
  },
  subText: {
    color: 'black',
    fontSize: 16,
    margin: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: '40%',
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  cardCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,
    marginTop: 10,
  },
});
