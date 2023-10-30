/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { styles } from './styles'
import { useUser } from '../../context/userContext'
import ErrorMessage from '../../components/error-message'
import { signin } from '../../queries/SignIn'
import { useNavigation } from '@react-navigation/native'


export function Login() {
  const [isAvailable, setIsAvaileble] = useState(false)
 const [name, setName] = useState('')
 const [password, setPassword] = useState('')
  const { login, logout, user } = useUser();

   useEffect(() => {
     logout()
   }, [])


  const handleSigning = () => {
    const format = {
      nome: name.toLowerCase(),
      password: parseInt(password)
    }

    setIsAvaileble(true)

    // @ts-ignore
    signin(format).then((data) => {
      login(data.nome)
      setIsAvaileble(false)
    }).catch(() => {
      logout()
    })
  }
  
  const handleSetName = (text: any) => {
    setName(text);
  };

  const handleSetPassword = (text: any) => {
    setPassword(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Bem-vindo de volta</Text>
        <View style={styles.separator} />
        <Text style={styles.subtitle}>Faça login com suas credenciais</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          onChangeText={handleSetName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={handleSetPassword}
          value={password}
        />
        {isAvailable && <ErrorMessage message="Aguardando Início da API, isso pode demorar um pouco..." />} 
        <Button
          title="Entrar"
          onPress={handleSigning}
          disabled={isAvailable}
        />
      </View>
    </View>
  )
}
