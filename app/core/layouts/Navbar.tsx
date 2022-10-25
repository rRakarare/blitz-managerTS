import { ReactNode, Suspense } from "react"
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  Link as ChakraLink,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  Text,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { useCurrentUser } from "app/users/hooks/useCurrentUser"
import { useMutation } from "@blitzjs/rpc"
import logout from "app/auth/mutations/logout"
import Link from "next/link"
import { Routes } from "@blitzjs/next"

const NavLink = ({ children }: { children: ReactNode }) => (
  <ChakraLink
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </ChakraLink>
)

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  console.log(currentUser)

  if (currentUser) {
    return (
      <>
        <HStack>
          <Menu>
            <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
              <Avatar size={"sm"} src={"https://avatars.dicebear.com/api/male/username.svg"} />
            </MenuButton>

            <MenuList alignItems={"center"}>
              <br />
              <Center>
                <Avatar size={"2xl"} src={"https://avatars.dicebear.com/api/male/username.svg"} />
              </Center>
              <br />
              <Center>
                <p>Username</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>Your Servers</MenuItem>
              <MenuItem>Account Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>

          <Button
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </Button>
        </HStack>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <Button>Signup</Button>
        </Link>
        <Link href={Routes.LoginPage()}>
          <Button>Login</Button>
        </Link>
      </>
    )
  }
}

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Stack direction={"row"} spacing={7}>
              <Text>asdqwe</Text>
              <NavLink>asdqwe</NavLink>
            </Stack>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Suspense fallback="Loading...">
                <UserInfo />
              </Suspense>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
