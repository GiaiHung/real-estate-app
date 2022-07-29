import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Flex,
    Button,
    Box,
    Spacer,
} from '@chakra-ui/react'
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc'
import { BsSearch } from 'react-icons/bs'
import { FiKey } from 'react-icons/fi'

function Navbar() {
    const [isSmallScreen, setIsSmallScreen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSmallScreen(true)
            } else {
                setIsSmallScreen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Flex p="2" borderBottom="1px" borderColor="gray.100" align="center">
            <Box fontSize="3xl" fontWeight="bold" color="blue.400" flex="0.5">
                <Link href="/" paddingLeft="2">
                    Realtor
                </Link>
            </Box>
            {isSmallScreen && <Spacer />}
            <Box flex="1">
                {isSmallScreen ? (
                    <Box display="flex" justifyContent="flex-end">
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                icon={<FcMenu />}
                                variant="outline"
                                color="red.400"
                            />
                            <MenuList>
                                <Link href="/" passHref>
                                    <MenuItem icon={<FcHome />}>Home</MenuItem>
                                </Link>
                                <Link href="/search" passHref>
                                    <MenuItem icon={<BsSearch />}>
                                        Search
                                    </MenuItem>
                                </Link>
                                <Link href="/search?purpose=for-sale" passHref>
                                    <MenuItem icon={<FiKey />}>
                                        Buy property
                                    </MenuItem>
                                </Link>
                                <Link href="/search?purpose=for-rent" passHref>
                                    <MenuItem icon={<FcAbout />}>
                                        Rent property
                                    </MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>
                    </Box>
                ) : (
                    <Flex align="center" justify="space-between">
                        <Link href="/" passHref>
                            <Button
                                fontWeight="bold"
                                fontSize="lg"
                                color="white"
                                cursor="pointer"
                                variant="outlined"
                                className={
                                    router.pathname === '/'
                                        ? 'nav-btn active'
                                        : 'nav-btn'
                                }
                            >
                                Home
                            </Button>
                        </Link>
                        <Link href="/search" passHref>
                            <Button
                                fontWeight="bold"
                                fontSize="lg"
                                color="white"
                                cursor="pointer"
                                variant="outlined"
                                className={
                                    router.pathname === '/search' &&
                                    !router.query.purpose
                                        ? 'nav-btn active'
                                        : 'nav-btn'
                                }
                            >
                                Search
                            </Button>
                        </Link>
                        <Link href="/search?purpose=for-sale" passHref>
                            <Button
                                fontWeight="bold"
                                fontSize="lg"
                                color="white"
                                cursor="pointer"
                                variant="outlined"
                                className={
                                    router.query.purpose === 'for-sale'
                                        ? 'nav-btn active'
                                        : 'nav-btn'
                                }
                            >
                                Buy property
                            </Button>
                        </Link>
                        <Link href="/search?purpose=for-rent" passHref>
                            <Button
                                fontWeight="bold"
                                fontSize="lg"
                                color="white"
                                cursor="pointer"
                                variant="outlined"
                                className={
                                    router.query.purpose === 'for-rent'
                                        ? 'nav-btn active'
                                        : 'nav-btn'
                                }
                            >
                                Rent property
                            </Button>
                        </Link>
                    </Flex>
                )}
            </Box>
        </Flex>
    )
}

export default Navbar
