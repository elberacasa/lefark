import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './screens/Home';
import CustomerApp from './navigation/CustomerApp';
import OwnerApp from './navigation/OwnerApp';
import Login from './screens/Login';
import Registration from './screens/Registration';

const RootStack = createStackNavigator();

function RootNavigator() {
  const { user } = useAuth();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        user.userType === 'owner' ? (
          <RootStack.Screen name="OwnerApp" component={OwnerApp} />
        ) : (
          <RootStack.Screen name="CustomerApp" component={CustomerApp} />
        )
      ) : (
        <>
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="Registration" component={Registration} />
        </>
      )}
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}