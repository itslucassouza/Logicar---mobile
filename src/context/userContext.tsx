/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type User = {
  name: string
  loggedIn: boolean
}

type UserContextType = {
  user: User
  login: (name: string) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

type UserProviderProps = {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const loadUser = async () => {
    try {
      // @ts-ignore
      const storedUser = await AsyncStorage.getItem('user')
      const initialUser: User = storedUser
        ? JSON.parse(storedUser)
        : { name: '', loggedIn: false }
      setUser(initialUser)
    } catch (error) {
      console.error('Error loading user from storage:', error)
    }
  }

  const saveUser = async (user: User) => {
    try {
      // @ts-ignore
      await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      console.error('Error saving user to storage:', error)
    }
  }

  const [user, setUser] = useState<User>({ name: '', loggedIn: false })

  useEffect(() => {
    loadUser()
  }, [])

  const logout = () => {
    const updatedUser: User = { name: '', loggedIn: false }
    setUser(updatedUser)
    saveUser(updatedUser)
  }

  const login = (name: string) => {
    const updatedUser: User = { name, loggedIn: true }
    setUser(updatedUser)
    saveUser(updatedUser)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
