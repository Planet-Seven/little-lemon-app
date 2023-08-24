import { StyleSheet, Text, View } from 'react-native';

export default function Splash() {
    return (
        <View style={styles.splash}>
            <Text style={styles.text}>Please wait</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    splash: {
        flex: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#cbd2d9',
        paddingLeft: 30,
        paddingRight: 30,
    },
    text: {
        fontSize: 20,
        color: '#324652',
    },
})