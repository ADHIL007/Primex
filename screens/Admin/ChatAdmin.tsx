import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase/app';
import {
  addDoc,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
  serverTimestamp,
  collection,
} from 'firebase/firestore';
import { getData } from '../AsyncStorage';
import { Firebase_DB } from '../FirebaseConfig';



const ChatAdmin = ({ route }) => {
  console.log(route);
  const { user } = route.params;
  console.log(user);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {

        const chatRef = collection(Firebase_DB, 'Chats', user, 'messages');
        const unsubscribe = onSnapshot(chatRef, snapshot => {
          const messagesData = [];
          snapshot.forEach(doc => {
            messagesData.push({ id: doc.id, ...doc.data() });
          });

          // Sort messages based on the order field
          const sortedMessages = messagesData.sort((a, b) => a.order - b.order).reverse();
          setMessages(sortedMessages);
          console.log(sortedMessages);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (newMessage.trim() === '') {
      return;
    }
    try {
      const chatRef = doc(Firebase_DB, 'Chats', user);
      const userMessageRef = collection(chatRef, 'messages');

      // Get the current order value
      const currentOrder = messages.length;

      // Create the message object with the order field
      const message = {
        text: newMessage,
        sender: 'admin',
        timestamp: serverTimestamp(),
        order: currentOrder
      };

      // Add the message to Firestore
      await addDoc(userMessageRef, message);

      // Update the local state with the new message
      setMessages([...messages, message]);
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
    setNewMessage('');
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.order.toString()}
        renderItem={({item}) => (
          <View
            style={
              item.sender === 'user'
                ? styles.userMessageContainer
                : styles.receiverMessageContainer
            }>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        inverted // To display messages from bottom to top
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <FontAwesome
            name="send"
            color={'#fff'}
            size={heightPercentageToDP('3%')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  userMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#feca57',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '70%',

  },
  receiverMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#00d2d3',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    color:'#000'
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    padding: 8,
  },
});

export default ChatAdmin;
