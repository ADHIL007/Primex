import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { Firebase_DB } from './FirebaseConfig'
import { useNavigation } from '@react-navigation/native'

const Chatroom = ({ navigation: {navigate}}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const collectionRef = collection(Firebase_DB, 'Users');
        const querySnapshot = await getDocs(collectionRef);
        const usersData = querySnapshot.docs.map(doc => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => {navigate('ChatAdmin', { user: item.email })}}>
      <Text style={styles.username}>{item.Fullname}</Text>
      <Text style={styles.userSchool}>staff from {item.school}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default Chatroom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',

  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chatItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: .31,
    borderColor: '#666',



  },
  username: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userSchool: {
    color: '#666',
    fontStyle :'italic'
  },
});
