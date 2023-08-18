import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Onboarding() {
    return (
        <>
            <View style={styles.header}>
               <Text style={styles.headerText}>Little Lemon</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.text}>Let us get to know you</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>First Name</Text>
                    <TextInput style={styles.input}/>
                    <Text style={styles.text}>Email</Text>
                    <TextInput style={styles.input} />
                </View>
            </View>
            <View style={styles.footer}>
                <Pressable style={styles.button}>
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
    headerText: {
        fontSize: 20,
        color: '#324652',
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
        backgroundColor: '#cbd2d9',
        padding: 10,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#445968',
    }
  });
