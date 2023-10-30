import { AppRegistry, Platform, StatusBar } from 'react-native'
import { UserProvider } from './src/context/userContext'
// import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import Dashboard from './src/screens/Dashboard'
import { Login } from './src/screens/Login'
import Routes from './src/routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './src/react-query/react-query.config'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {/* <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        /> */}
        {/* <Login /> */}
        <Routes />
      </UserProvider>
    </QueryClientProvider>
  )
}

AppRegistry.registerComponent('main', () => App)
export default App
