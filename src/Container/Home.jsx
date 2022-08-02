import React from 'react'
import { getAnalytics, logEvent } from "firebase/analytics";
import { firebaseApp } from '../firebase-config';

import NavBar from '../Components/NavBar';
import { Flex } from "@chakra-ui/react";
import Feed from '../Components/Feed';
// 

const Home = ({user}) => {

  return (
    <div>
        <NavBar user={user}  />
        <Flex width={"100vw"}>
  <Flex
    direction={"column"}
    justifyContent="start"
    alignItems={"center"}
    width="5%"
  >
  </Flex>

  <Flex
    width={"95%"}
    px={4}
    justifyContent="center"
    alignItems={"center"}
    px={4}
  >
    <Feed/>
  </Flex>
</Flex>
    </div>
  )
}

export default Home
