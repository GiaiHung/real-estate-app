import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Flex, Box, Text, Icon } from '@chakra-ui/react'
import { BsFilter } from 'react-icons/bs'

import SearchFilters from '../components/SearchFilters'
import NoResult from '../images/noresult.svg'
import { fetchApi, baseUrl } from '../utils/fetchApi'
import Property from '../components/Property'

function Search({ properties }) {
    const [searchFilters, setSearchFilters] = useState(false)
    const router = useRouter()
    
    return (
        <Box>
            {/* Toggle filter */}
            <Flex
                bg="gray.100"
                borderBottom="2px"
                borderColor="gray.300"
                fontSize="2xl"
                fontWeight="black"
                padding="2"
                align="center"
                justify="center"
                cursor="pointer"
                onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
            >
                <Text>Search Property By Filters</Text>
                <Icon paddingLeft="2" w="9" as={BsFilter} />
            </Flex>

            {/* Filter */}
            {searchFilters && <SearchFilters />}

            {/* Title */}
            <Text
                fontSize="2xl"
                fontWeight="bold"
                textAlign="center"
                marginY="3"
            >
                Properties {router.query.purpose}
            </Text>

            {/* Map and render property */}
            <Flex wrap="wrap">
                {properties?.map((property) => (
                    <Property property={property} key={property.id} />
                ))}
            </Flex>

            {/* No Result */}
            {properties.length === 0 && (
                <Flex
                    marginY="5"
                    flexDirection="column"
                    align="center"
                    justify="center"
                    gap="1rem"
                    fontSize="2xl"
                >
                    <Image src={NoResult} alt="no result" />
                    <Text>No Results Found</Text>
                </Flex>
            )}
        </Box>
    )
}

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent'
    const rentFrequency = query.rentFrequency || 'yearly'
    const minPrice = query.minPrice || '0'
    const maxPrice = query.maxPrice || '1000000'
    const roomsMin = query.roomsMin || '0'
    const bathsMin = query.bathsMin || '0'
    const sort = query.sort || 'price-desc'
    const areaMax = query.areaMax || '35000'
    const locationExternalIDs = query.locationExternalIDs || '5002'
    const categoryExternalID = query.categoryExternalID || '4'

    const data = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
    )

    return {
        props: {
            properties: data?.hits,
        },
    }
}

export default Search
