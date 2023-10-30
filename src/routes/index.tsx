import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack' // Importe o Stack.Navigator
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Login } from '../screens/Login'
import { useUser } from '../context/userContext'
import Dashboard from '../screens/Dashboard'
import { Cars } from '../screens/Cars'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator() // Crie um Stack.Navigator

export default function Routes() {
  const { user } = useUser()

  return (
    <NavigationContainer>
      {user.name ? (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Dashboard} />
          <Drawer.Screen name="Car" component={Cars} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }} // Oculta o cabeçalho da tela de login
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
