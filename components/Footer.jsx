import { Box } from '@chakra-ui/react'

function Footer() {
    const year = new Date().getFullYear()
    return (
        <Box
            textAlign="center"
            p="5"
            borderTop="2px"
            color="gray.600"
            borderColor="gray.300"
            maxWidth='1280'
            margin='auto'
        >
            {year} Realtor, Inc.
            <br />
            <span>© Copyright</span>
        </Box>
    )
}

export default Footer
