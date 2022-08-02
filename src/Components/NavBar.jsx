import React from "react";
import logo_dark from "../img/logo_dark.png";
import { Link, useNavigate } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";
import { Flex, Image, Menu, MenuButton, MenuItem, MenuList, useColorModeValue } from "@chakra-ui/react";
import { IoAdd, IoLogOut } from "react-icons/io5";
import { firebaseApp } from "../firebase-config";

const NavBar = ({ user }) => {
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.600", "gray.300");
  const analytics = getAnalytics(firebaseApp);

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems="center"
      width={"100vw"}
      p={4}
    >
      <Link to={"/"}>
        <Image src={logo_dark } width={"180px"} />
      </Link>
      <Flex justifyContent={"center"} alignItems="center">
        <Link to={"/create"}>
          <Flex
            justifyContent={"center"}
            alignItems="center"
            bg={bg}
            width="40px"
            height="40px"
            borderRadius="5px"
            mx={6}
            cursor="pointer"
            _hover={{ shadow: "md" }}
            transition="ease-in-out"
            transitionDuration={"0.3s"}
          >
            <IoAdd
              fontSize={25}
              color={ "#fff" }
            />
          </Flex>
        </Link>

        <Menu>
          <MenuButton>
            <Image
              src={user?.photoURL}
              width="40px"
              height="40px"
              minWidth={"40px"}
              rounded="full"
            />
          </MenuButton>
          <MenuList shadow={"lg"}>
           
            <MenuItem
              flexDirection={"row"}
              alignItems="center"
              gap={4}
              onClick={() => {
                localStorage.clear();
                logEvent(analytics, 'logout')
                
                navigate("/login", { replace: true });
              }}
            >
              Logout <IoLogOut fontSize={20} />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavBar;
