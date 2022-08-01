import React ,{useEffect, useState}from 'react'
import {getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged,  } from  'firebase/auth'
import { Button, Flex, HStack } from '@chakra-ui/react'
import {FcGoogle} from 'react-icons/fc'
import { firebaseApp } from '../firebase-config'
import { useNavigate } from 'react-router-dom'
import {doc, getFirestore, setDoc, } from 'firebase/firestore'


const Login = () => { 

  const firebaseAuth = getAuth(firebaseApp)
  const provider = new GoogleAuthProvider()
  const firebaseDb = getFirestore(firebaseApp)
  const navigate = useNavigate()
  const [token, setToken] = useState('')

  useEffect(()=>{
    const token = localStorage.getItem('accessToken')
    console.log('token', token)
    setToken(token)
    // onAuthStateChanged(getAuth(), (userDetails)=>{
    //   const {user} = userDetails
    //   console.log('userkjk', userDetails)
    //   // if(user){
    //   //   navigate('/', {replace: true})
    //   // }
    // })

    // if(token){
    //   navigate('/', {replace:true})
    // }
  },[])

  const login = async ()=>{
    const {user} = await signInWithPopup(firebaseAuth, provider)

    const {accessToken, providerData, refreshToken} = user
    console.log('user', user)
    console.log('response', accessToken, providerData)
    
    localStorage.setItem('user', JSON.stringify(providerData))
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken))

    await setDoc(doc(firebaseDb, 'users', providerData[0].uid), providerData[0])
      navigate('/', {replace:true})

  }
  return (
    <Flex
     justifyContent={'center'}
    alignItems={'center'}
    height={'100vh'}
    width={'100vw'}
    position={'relative'}>
      <Flex position={'absolute'}
       height={'100vh'}
       width={'100vw'}
       bg={'blackAlpha.600'}
       top={0}
       justifyContent={'center'}
       alignItems={'center'}
       left={0}
      >
<HStack>
  <Button leftIcon={<FcGoogle fontSize={25}/> } colorScheme='whiteAlpha' shadow={'lg'} onClick={()=>login()}>
    Sign in with google
  </Button>
</HStack>

      </Flex>
    </Flex>
  )
}

export default Login