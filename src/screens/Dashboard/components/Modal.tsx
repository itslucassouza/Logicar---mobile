/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native'
import Modal from 'react-native-modal'
import { useQueryClient } from '@tanstack/react-query'
import ErrorMessage from '../../../components/error-message'
import { updateTransaction } from '../../../queries/exitCar'

export const ExitCarModal = ({ isVisible, handleClose }: any) => {
  const queryClient = useQueryClient()

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return ''

    const date = new Date(timestamp)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const initialFormData = {
    plate: '',
  }

  const [formData, setFormData] = useState(initialFormData)
  const [data, setData] = useState<any>()

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const handleCancel = () => {
    resetForm()
    handleClose()
    setData({})
  }

  const onSubmit = () => {
    const plate = String(formData.plate)
    
    updateTransaction(plate)
      .then((dataResult: any) => {
        queryClient
          .invalidateQueries({ queryKey: ['dashboardData'] })
          .then(() => {
            setData(dataResult)
          })
      })
      .catch((e: any) => {
        setData(e)
      })
  }
  useEffect(() => {
    setData({})
  }, [])

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={handleClose}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View
        style={{
          backgroundColor: '#333', 
          borderRadius: 10,
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '80%',
          }}
        >
          {data?.value ? (
            <View>
              <Text>Hora de Entrada:</Text>
              <Text>{formatTimestamp(data?.entryTime)}</Text>

              <Text>Hora de Saída:</Text>
              <Text>{formatTimestamp(data?.exitTime)}</Text>

              <Text>Valor Pago:</Text>
              <Text style={{ color: 'blue' }}>{data?.value}</Text>

              <Button title="Obrigado" onPress={handleCancel} />
            </View>
          ) : (
            <View>
              <Text>Placa do Veículo</Text>
              <TextInput
                style={{
                  backgroundColor: '#d3d3d3',
                  marginBottom: 6,
                  height: 30,
                }}
                value={formData.plate}
                onChangeText={(text) => handleChange('plate', text)}
                placeholder="Digite a placa do Veículo"
              />

              {data?.message && (
                <ErrorMessage
                  message={data?.response.data.error}
                />
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fff',
                    padding: 16,
                    borderRadius: 10,
                    width: '48%',
                  }}
                  onPress={handleCancel}
                >
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 13,
                      textAlign: 'center',
                    }}
                  >
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: 'red',
                    padding: 16,
                    borderRadius: 10,
                    width: '48%',
                    height: 50
                  }}
                  onPress={onSubmit}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      textAlign: 'center',
                    }}
                  >
                    Finalizar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  )
}
