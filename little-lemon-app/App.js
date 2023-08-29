import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import Splash from './screens/Splash';
import Home from './screens/Home';
import * as React from 'react';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();
export const AuthContext = React.createContext();

export default function App() {


const [state, dispatch] = React.useReducer(
  (prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        };
    }
  },
  {
    isLoading: true,
    isSignout: false,
    userToken: null,
  }
);

React.useEffect(() => {
  // Fetch the token from storage then navigate to our appropriate place
  const bootstrapAsync = async () => {
    let userToken;

    try {
      userToken = await SecureStore.getItemAsync('userToken');
    } catch (e) {
      // Restoring token failed
    }

    // After restoring token, we may need to validate it in production apps

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    dispatch({ type: 'RESTORE_TOKEN', token: userToken });
  };

  bootstrapAsync();
}, []);

const authContext = React.useMemo(
  () => ({
    signIn: async (data) => {
      // In a production app, we need to send some data (usually username, password) to server and get a token
      // We will also need to handle errors if sign in failed
      // After getting token, we need to persist the token using `SecureStore`
      // In the example, we'll use a dummy token

      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    },
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
    signUp: async (data) => {
      // In a production app, we need to send user data to server and get a token
      // We will also need to handle errors if sign up failed
      // After getting token, we need to persist the token using `SecureStore`
      // In the example, we'll use a dummy token

      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    },
  }),
  []
);

if (state.isLoading) {
  return <Splash/>;
}
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
          <Stack.Screen
            name='onboarding'
            component={Onboarding}
            options={{
              headerShown: false,
              animationTypeForReplace: state.isSignout ? 'pop' : 'push' }}/>
          ):(
          <>
          <Stack.Screen
            name='home'
            component={Home}
            options={{
              headerShown: false }}/>
          <Stack.Screen
            name='profile'
            component={Profile}
            options={{
              headerShown: false }}/>
          </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
