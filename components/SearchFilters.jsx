import { useEffect, useState } from 'react'
import {
    Flex,
    Select,
    Box,
    Text,
    Input,
    Spinner,
    Icon,
    Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MdCancel } from 'react-icons/md'
import Image from 'next/image'

import { filterData, getFilterValues } from '../utils/filterData'

function SearchFilters() {
    const [filters, setFilters] = useState(filterData)
    const router = useRouter()

    const setProperties = (filteredValue) => {
        const { query } = router

        const values = getFilterValues(filteredValue)

        values.forEach((item) => {
            if (item.value) {
                query[item.name] = item.value
            }
        })

        router.push({ query })

        console.log(values, router)
    }

    return (
        <Flex bg="gray.100" justify="center" wrap="wrap" p="4">
            {filters.map((filter) => (
                <Box key={filter.queryName}>
                    <Select
                        w="fit-content"
                        p="2"
                        placeholder={filter.placeholder}
                        onChange={(e) =>
                            setProperties({
                                [filter.queryName]: e.target.value,
                            })
                        }
                    >
                        {filter?.items.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </Box>
            ))}
        </Flex>
    )
}

export default SearchFilters
