import { Pressable, StyleSheet, Text, TextInput, View, Image, Alert} from 'react-native';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { AuthContext } from '../App'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Onboarding() {

    const [firstName, onChangeFirstName] = useState();
    const [email, onChangeEmail] = useState();
    const [isValid, toggleValid] = useState(false);

    function validateName(name) {
        var pattern = /^[a-zA-Z]+$/;
        return pattern.test(name);
    }

    function validateEmail(email) {
        var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
      }

    const toggleValidity = () => {
        if (isValid == false && validateName(firstName) == true && validateEmail(email) == true) {
            toggleValid(true)
        } else {
            toggleValid(false)
        }
    }

    const storeData = async (firstName, email) => {
        try {
            const dataToStore = [
                ['firstName', firstName],
                ['lastName', ''],
                ['email', email],
                ['phone', '']
            ];

            await AsyncStorage.multiSet(dataToStore);
            console.log('Data stored successfully');

        } catch (error) {
            console.error('Error storing data:', error);
        }
    }

    const { signIn } = React.useContext(AuthContext);

    const handleSubmit = () => {
        isValid ? signIn({ firstName, email }): Alert.alert('please provide valid data')
        storeData(firstName, email)
    }

    useEffect(() => {
        toggleValidity();
      }, [firstName, email]);

    return (
        <>
            <View style={styles.header}>
               <Image
                style={styles.headerImage}
                source={require('../assets/Logo.png')}/>
            </View>
            <View style={styles.body}>
                <Text style={styles.text}>Let us get to know you</Text>
                <View style={styles.inputContainer}>

                    <Text style={styles.text}>First name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeFirstName}
                        placeholder={'First name'}
                        value={firstName}/>

                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeEmail}
                        placeholder={'Email'}
                        value={email}
                        inputMode='email'/>

                </View>
            </View>
            <View style={styles.footer}>
                <Pressable style={isValid ? styles.button : styles.buttonDisabled}
                onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    body: {
        flex: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#cbd2d9',
        paddingLeft: 30,
        paddingRight: 30,
    },
    header: {
        flex: 2,
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
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
    },
    headerImage: {
        marginTop: 40
    },
    text: {
        fontSize: 20,
        color: '#324652',
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
        padding: 10,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',

    },
    buttonDisabled: {
        backgroundColor: '#cbd2d9',
        padding: 10,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#dee3e9',
    },
  });
