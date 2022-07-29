import { Box, Flex, Spacer, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import { FaBed, FaBath } from 'react-icons/fa'
import { BsBoxArrowDown, BsGridFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import millify from 'millify'

import { fetchApi, baseUrl } from '../../utils/fetchApi'
import ImageScrollbar from '../../components/ImageScrollbar'

function PropertyDetails({
    propertyDetails: {
        price,
        rentFrequency,
        rooms,
        title,
        baths,
        area,
        agency,
        isVerified,
        description,
        type,
        purpose,
        furnishingStatus,
        amenities,
        photos,
    },
}) {
    return (
        <Box maxWidth="1000" p="4" margin="auto">
            {/* Photo */}
            {photos && <ImageScrollbar data={photos} />}

            {/* Content */}
            <Flex paddingTop="2" align="center" justify="space-between">
                {/* Heading */}
                <Flex align="center" justify="center">
                    <Box paddingRight="3" color="green.300">
                        {isVerified && <GoVerified style={{ fontSize: '1.5rem' }} />}
                    </Box>
                    <Text fontWeight="bold" fontSize="2xl">
                        AED {millify(price)}
                        {rentFrequency && `/${rentFrequency}`}
                    </Text>
                </Flex>
                <Flex
                    align="center"
                    justify="space-between"
                    width="250px"
                    color="blue.400"
                    marginY="4"
                    fontSize="xl"
                >
                    <Flex align="center" gap=".5rem">
                        {rooms} <FaBed />
                    </Flex>
                    |
                    <Flex align="center" gap=".5rem">
                        {baths} <FaBath />
                    </Flex>
                    |
                    <Flex align="center" gap=".5rem">
                        {millify(area)} sqft <BsGridFill />
                    </Flex>
                </Flex>
                <Box>
                    <Avatar
                        name={agency?.name}
                        src={agency?.logo?.url}
                        size="md"
                    />
                </Box>
            </Flex>

            {/* Title and description */}
            <Box mt="2">
                <Text fontSize="xl" fontWeight="bold">
                    {title.toUpperCase()}
                </Text>
                <p
                    dangerouslySetInnerHTML={{ __html: description }}
                    style={{
                        padding: '1rem 0',
                        fontSize: '1rem',
                        color: '#4A5568',
                        lineHeight: '2',
                    }}
                ></p>
            </Box>

            {/* Table */}
            <Flex
                flexWrap="wrap"
                gap=".5rem"
                textTransform="uppercase"
                justifyContent="space-between"
            >
                <Flex
                    justifyContent="space-between"
                    w="400px"
                    borderBottom="2px"
                    borderColor="gray.300"
                    p="3"
                >
                    <Text>Type</Text>
                    <Text fontWeight="bold">{type}</Text>
                </Flex>
                <Flex
                    justifyContent="space-between"
                    w="400px"
                    borderBottom="2px"
                    borderColor="gray.300"
                    p="3"
                >
                    <Text>Purpose</Text>
                    <Text fontWeight="bold">{purpose}</Text>
                </Flex>
                {furnishingStatus && (
                    <Flex
                        justifyContent="space-between"
                        w="400px"
                        borderBottom="2px"
                        borderColor="gray.300"
                        p="3"
                    >
                        <Text>Furnishing Status</Text>
                        <Text fontWeight="bold">{furnishingStatus}</Text>
                    </Flex>
                )}
            </Flex>

            {/* Amenities */}
            <Box>
                {amenities && (
                    <Text fontSize="xl" fontWeight="bold" marginY="5">
                        Facilities:
                    </Text>
                )}
                <Flex wrap="wrap">
                    {amenities?.map((item) =>
                        item?.amenities?.map((amenity) => (
                            <Text
                                key={amenity.text}
                                fontSize="lg"
                                fontWeight="bold"
                                color="blue.400"
                                backgroundColor="gray.200"
                                borderRadius="4"
                                p="2"
                                marginY="1"
                                mr='2'
                            >
                                {amenity.text}
                            </Text>
                        ))
                    )}
                </Flex>
            </Box>
        </Box>
    )
}

export async function getServerSideProps({ params: { id } }) {
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`)

    return {
        props: {
            propertyDetails: data,
        },
    }
}

export default PropertyDetails
