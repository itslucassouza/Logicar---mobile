import React from 'react'
import { Text, StyleSheet } from 'react-native'

interface ErrorMessageProps {
  message?: string
  className?: string
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
})

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = '',
  className,
}) => {
  return <Text style={[styles.errorMessage]}>{message}</Text>
}

export default ErrorMessage
