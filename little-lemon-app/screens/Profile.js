import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function Profile() {
    return (
        <>
            <View style={styles.header}>
                <Image
                    style={styles.headerImage}
                    source={require('../assets/Logo.png')}/>
            </View>
            <View style={styles.body}>
                <Text>Personal information</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.text}>First name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'First name'}/>

                    <Text style={styles.text}>Last name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Last name'}/>

                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Email'}/>

                    <Text style={styles.text}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'Phone number'}/>

                    <Text>Email notifications</Text>

                    <Text>Order statuses</Text>
                    <Text>Password changes</Text>
                    <Text>Special offers</Text>
                    <Text>Newsletter</Text>
                </View>

            </View>
            <View style={styles.footer}>
                <View style={styles.twoButtonView}>
                    <Pressable style={styles.secondaryButton}>
                        <Text style={styles.secondaryButtonText}>Discard changes</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Save changes</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.tertiaryButton}>
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
        alignItems: 'space-between',
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