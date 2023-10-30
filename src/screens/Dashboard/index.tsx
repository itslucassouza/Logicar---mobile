/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useUser } from '../../context/userContext' // Substitua pelo caminho correto do seu contexto
import { useDashboardData } from '../../queries/useDashboardData'
import { useNavigation } from '@react-navigation/native'
import { ExitCarModal } from './components/Modal'
// Importe as telas ExitCarModal e useDashboardData

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const navigation = useNavigation()
  const handleUpdateShowModal = () => setIsOpen(!isOpen)
  const { data } = useDashboardData()

  const handleNavigateToCars = () => {
    // @ts-ignore
    navigation.navigate('Car')
  }

  return (
    <>
      <ExitCarModal isVisible={isOpen} handleClose={handleUpdateShowModal} />
      <View style={{ flex: 1, backgroundColor: '#0A0D14', padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 24, paddingBottom: 16 }}>
          👋 Bem-vindo a Logicar
        </Text>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginVertical: 16,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: '#339AF0',
              padding: 16,
              borderRadius: 10,
            }}
            onPress={handleNavigateToCars}
          >
            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>
              Entrada de Novo Veículo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#339AF0',
              padding: 16,
              borderRadius: 10,
              marginTop: 16,
            }}
            onPress={handleUpdateShowModal}
          >
            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>
              Saída de Veículo
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View
            style={{
              backgroundColor: '#474A4F',
              borderRadius: 10,
              padding: 16,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16, // Espaçamento inferior para separar as seções
            }}
          >
            <Text style={{ color: 'white', fontSize: 24, marginBottom: 4 }}>
              Vagas Disponíveis
            </Text>
            <Text style={{ color: 'white', fontSize: 24 }}>
              {data?.availableVancacies}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View
            style={{
              backgroundColor: '#474A4F',
              borderRadius: 10,
              padding: 16,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16, // Espaçamento inferior para separar as seções
            }}
          >
            <Text style={{ color: 'white', fontSize: 24, marginBottom: 4 }}>
              Vagas Ocupadas
            </Text>
            <Text style={{ color: 'white', fontSize: 24 }}>
              {data?.ativeCars?.length}
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}
