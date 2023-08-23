import { StyleSheet, Text, View } from 'react-native';

export default function Profile() {
    return (
        <View style={styles.profile}>
            <Text style={styles.text}>Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    profile: {
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