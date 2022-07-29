import Link from 'next/link'
import Image from 'next/image'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import { FaBed, FaBath } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import millify from 'millify'

import DefaultImage from '../images/house.jpg'

function Property({
    property: {
        externalID,
        coverPhoto,
        price,
        rentFrequency,
        rooms,
        baths,
        area,
        title,
        agency,
        isVerified,
    },
}) {
    return (
        <Link href={`/property/${externalID}`} passHref>
            <Flex
                wrap="wrap"
                w="420px"
                p="5"
                paddingTop="0"
                justify="flex-start"
                cursor="pointer"
            >
                {/* Image */}
                <Box>
                    <Image
                        src={coverPhoto ? coverPhoto.url : DefaultImage}
                        width={400}
                        height={260}
                        alt="house"
                    />
                </Box>

                {/* Content */}
                <Box w="full">
                    {/* Header */}
                    <Flex paddingTop="2" align="center" justify="space-between">
                        <Flex align="center">
                            <Box paddingRight="3" color="green.300">
                                {isVerified && <GoVerified />}
                            </Box>
                            <Text fontWeight="bold" fontSize="lg">
                                AED {millify(price)}
                                {rentFrequency && `/${rentFrequency}`}
                            </Text>
                        </Flex>
                        <Box>
                            <Avatar
                                name={agency?.name}
                                src={agency?.logo?.url}
                                size="sm"
                            />
                        </Box>
                    </Flex>

                    {/* Icon description and title */}
                    <Flex
                        align="center"
                        justify="space-between"
                        width="250px"
                        color="blue.400"
                        marginY="2"
                    >
                        <Flex align='center' gap='.5rem'>
                            {rooms} <FaBed />
                        </Flex>
                        |
                        <Flex align='center' gap='.5rem'>
                            {baths} <FaBath />
                        </Flex>
                        |
                        <Flex align='center' gap='.5rem'>
                            {millify(area)} sqft <BsGridFill /> 
                        </Flex>
                    </Flex>
                    <Text fontSize="lg">
                        {title.length > 30
                            ? `${title.substring(0, 30).toUpperCase()}...`
                            : title.toUpperCase()}
                    </Text>
                </Box>
            </Flex>
        </Link>
    )
}

export default Property
