import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import { useQueryClient } from '@tanstack/react-query'
import ErrorMessage from '../../../components/error-message'
import { createCar } from '../../../queries/useCreateCar'

export const CustomModal = ({ isVisible, onClose }: any) => {
  const queryClient = useQueryClient()
  const [data, setData] = useState<any>()
  const initialFormData = {
    conductorName: '',
    color: '',
    plate: '',
  }

  const [formData, setFormData] = useState(initialFormData)

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const handleCancel = () => {
    resetForm()
    onClose()
    setData({})
  }

  const onSubmit = () => {
    const format = {
      ...formData,
      parkingId: 'dceb2337-42e0-4a69-bc92-d18e392191a2',
    }

    createCar(format)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['carData'] })
        handleCancel()
      })
      .catch((e: any) => {
        setData(e)
      })
  }

  useEffect(() => {
    setData({})
  }, [])

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View
        style={{
          backgroundColor: '#333', // Fundo escuro
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: 'white' }}>Nome</Text>
        <TextInput
          style={{
            backgroundColor: '#d3d3d3',
            marginBottom: 6,
            height: 30,
            color: 'black', // Cor do texto
          }}
          value={formData.conductorName}
          onChangeText={(text) =>
            setFormData({ ...formData, conductorName: text })
          }
          placeholder="Nome"
        />

        <Text style={{ color: 'white' }}>Cor</Text>
        <TextInput
          style={{
            backgroundColor: '#d3d3d3',
            marginBottom: 6,
            height: 30,
            color: 'black', // Cor do texto
          }}
          value={formData.color}
          onChangeText={(text) => setFormData({ ...formData, color: text })}
          placeholder="Cor"
        />

        <Text style={{ color: 'white' }}>Placa</Text>
        <TextInput
          style={{
            backgroundColor: '#d3d3d3',
            marginBottom: 6,
            height: 30,
            color: 'black', // Cor do texto
          }}
          value={formData.plate}
          onChangeText={(text) => setFormData({ ...formData, plate: text })}
          placeholder="Placa"
        />

        {data?.message && <ErrorMessage message={data.response.data.error} />}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Cancelar" onPress={handleCancel} />
          <Button title="Salvar" onPress={onSubmit} />
        </View>
      </View>
    </Modal>
  )
}
