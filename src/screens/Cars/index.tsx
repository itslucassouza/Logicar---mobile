/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { useCarsData } from '../../queries/useCarsData'
// @ts-ignore
import { Table, Row } from 'react-native-table-component'
import { CustomModal } from './components/Modal'

export function Cars() {
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useCarsData()

  const handleUpdateShowModal = () => setIsOpen(!isOpen)

  const tableHead = ['Usuario', 'Cor', 'Placa', 'Status']

  const tableData = data?.map((item: any) => [
    item.conductorName,
    item.color,
    item.plate.toUpperCase(),
    item.status === 'active' ? 'Ativo' : 'Inativo',
  ])

  return (
    <>
      <CustomModal
        isVisible={isOpen}
        onClose={handleUpdateShowModal}
        modalText="Este é um modal de exemplo."
      />
      <View style={{ flex: 1, padding: 16, backgroundColor: '#0A0D14' }}>
        <View>
          <Text
            style={{
              color: 'white',

              fontSize: 24,
              marginBottom: 16,
            }}
          >
            Carros Cadastrados
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#339AF0',
              padding: 16,
              margin: 16,
              borderRadius: 10,
            }}
            onPress={handleUpdateShowModal}
          >
            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>
              Entrada de Novo Veículo
            </Text>
          </TouchableOpacity>
        </View>
        <Table borderStyle={{ borderWidth: 1, borderColor: 'white' }}>
          <Row
            data={tableHead}
            style={{ height: 40, backgroundColor: 'gray' }}
            textStyle={{ color: 'white' }}
          />
        </Table>
        <Table borderStyle={{ borderWidth: 1, borderColor: 'white' }}>
          {tableData?.map((rowData: any, index: any) => (
            <Row
              key={index}
              data={rowData}
              style={{
                height: 40,
                backgroundColor: index % 2 === 0 ? 'white' : 'lightgray',
              }}
              textStyle={{
                ...(rowData[3] === 'Ativo'
                  ? { color: 'green' }
                  : { color: 'red' }),
              }}
            />
          ))}
        </Table>
      </View>
    </>
  )
}
