import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { AuthContext } from '../App'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile( {navigation} ) {

    const [firstName, onChangeFirstName] = useState();
    const [lastName, onChangeLastName] = useState();
    const [email, onChangeEmail] = useState();
    const [phone, onChangePhone] = useState();

    const [data, setData] = useState({})

    const storeData = async (firstName, lastName, email, phone) => {
        try {
            const dataToStore = [
                ['firstName', firstName],
                ['lastName', lastName],
                ['email', email],
                ['phone', phone]
            ];

            await AsyncStorage.multiSet(dataToStore);
            console.log('Data stored successfully');

        } catch (error) {
            console.error('Error storing data:', error);
        }
    };

    const retrieveData = async () => {
        try {
            const keysToRetrieve = [
                'firstName',
                'lastName',
                'email',
                'phone'
            ];

            const retrievedData = await AsyncStorage.multiGet(keysToRetrieve);

            const data = {};

            for (let i = 0; i < retrievedData.length; i++) {
                const key = retrievedData[i][0];
                const value = retrievedData[i][1];
                data[key] = value;
            }

            console.log(data)
            return data;

        } catch (error) {
          console.error('Error retrieving data:', error);
          return null;
        }
    };

    const clearTable = async () => {
        try {
            await AsyncStorage.clear()
          } catch(e) {
            // clear error
          }
          console.log('cleared')
    }

    const { signOut } = React.useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
        const storedData = await retrieveData();

        setData(storedData);
        onChangeFirstName(storedData['firstName'])
        onChangeLastName(storedData['lastName'])
        onChangeEmail(storedData['email'])
        onChangePhone(storedData['phone'])
      };

      fetchData()
    }, [])

    return (
        <>
            <View style={styles.header}>
                <Pressable style={styles.headerButton} onPress={(navigation.goBack)}>
                    <Text style={styles.headerButtonText}>Back</Text>
                </Pressable>
                <Image
                    style={styles.headerImage}
                    source={require('../assets/Logo.png')}/>
                <Pressable style={styles.headerButton}></Pressable>
            </View>
            <View style={styles.body}>
                <Text style={styles.headerText}>Personal information</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.text}>First name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'First name'}
                        onChangeText={onChangeFirstName}
                        value={firstName}/>

                    <Text style={styles.text}>Last name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Last name'}
                        onChangeText={onChangeLastName}
                        value={lastName}/>

                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Email'}
                        inputMode='email'
                        onChangeText={onChangeEmail}
                        value={email}/>

                    <Text style={styles.text}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Phone number'}
                        inputMode='tel'
                        onChangeText={onChangePhone}
                        value={phone}/>

                    <Text style={styles.headerText}>Email notifications</Text>

                    <Text style={styles.text}>Order statuses</Text>
                    <Text style={styles.text}>Password changes</Text>
                    <Text style={styles.text}>Special offers</Text>
                    <Text style={styles.text}>Newsletter</Text>
                </View>

            </View>
            <View style={styles.footer}>
                <View style={styles.twoButtonView}>
                    <Pressable style={styles.secondaryButton}>
                        <Text style={styles.secondaryButtonText}>Discard changes</Text>
                    </Pressable>
                    <Pressable style={styles.button}
                        onPress={()=>{
                            storeData(firstName, lastName, email, phone)
                        }}>
                        <Text style={styles.buttonText}>Save changes</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.tertiaryButton}
                    onPress={()=>{
                        clearTable()
                        signOut()
                    }}>
                    <Text style={styles.tertiaryButtonText}>Log out</Text>
                </Pressable>
            </View>
        </>
    )
}

const styles = StyleSheet.create ({
    body: {
        flex: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#cbd2d9',
        paddingLeft: 30,
        paddingRight: 30,
    },
    headerButton: {
        width: 80,
        height: 40,
        marginTop: 40
    },
    header: {
        flex: 2,
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#dee3e9',
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flex: 3,
        height: 80,
        backgroundColor: '#dee3e9',
        alignItems: 'space-between',
        justifyContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
    },
    headerImage: {
        marginTop: 40
    },
    text: {
        fontSize: 15,
        color: '#324652',
    },
    headerText: {
        fontSize: 20,
        color: '#324652',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10
    },
    headerButtonText: {
        fontSize: 18,
        color: '#324652',
        fontWeight: 'bold',
        padding: 10
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        height: 50,
        marginBottom: 20,
        fontSize: 20,
        color: '#324652',
        padding: 5
    },
    inputContainer: {
        alignSelf: 'stretch',
    },
    button: {
        backgroundColor: '#324652',
        borderWidth: 2,
        borderColor: '#324652',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 5,
        height: 50,
    },
    secondaryButton: {
        borderColor: '#324652',
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginRight: 5,
        height: 50,
    },
    tertiaryButton: {
        backgroundColor: '#d9554c',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: 60,
        alignSelf: 'stretch',
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#cbd2d9',
        padding: 10,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#dee3e9',
    },
    secondaryButtonText:{
        fontSize: 16,
        color: '#324652',
    },
    tertiaryButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#dee3e9',
    },
    twoButtonView: {
        flexDirection: 'row',
    }
})