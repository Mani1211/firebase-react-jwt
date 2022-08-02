import React ,{useEffect, useState}from 'react'
import {getAuth, signInWithPopup, GoogleAuthProvider  } from  'firebase/auth'
import { Button, Flex } from '@chakra-ui/react'
import {FcGoogle} from 'react-icons/fc'
import { firebaseApp } from '../firebase-config'
import { useNavigate } from 'react-router-dom'
import {doc, getFirestore, setDoc, } from 'firebase/firestore'
import { getAnalytics, logEvent } from "firebase/analytics";
import Video from '../img/video.png'



const Login = () => { 

  const firebaseAuth = getAuth(firebaseApp)
  const analytics = getAnalytics(firebaseApp);

  const provider = new GoogleAuthProvider()
  const firebaseDb = getFirestore(firebaseApp)
  const navigate = useNavigate()
  const [token, setToken] = useState('')

  useEffect(()=>{
    const token = localStorage.getItem('accessToken')
    logEvent(analytics, 'visited_login')
    console.log('token', token)
    setToken(token)
  },[])

  const login = async ()=>{
    const {user} = await signInWithPopup(firebaseAuth, provider)

    const {accessToken, providerData, refreshToken} = user
    localStorage.setItem('user', JSON.stringify(providerData))
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
    logEvent(analytics, 'login')
    await setDoc(doc(firebaseDb, 'users', providerData[0].uid), providerData[0])
      navigate('/', {replace:true})
  }
  return (
    <Flex
     justifyContent={'center'}
    alignItems={'center'}
    height={'100vh'}
    display={'flex'}
    flexDirection={'column'}
    width={'100vw'}
    position={'relative'}>
        <img src={Video} alt="" width={300} height={300} />
  <Button leftIcon={<FcGoogle fontSize={25}/> }  shadow={'lg'} onClick={()=>login()}>
    Sign in with google
  </Button>
    </Flex>
  )
}

export default Login