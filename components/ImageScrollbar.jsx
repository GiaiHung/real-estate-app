import { useContext } from 'react'
import Image from 'next/image'
import { Box, Icon, Flex } from '@chakra-ui/react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'

const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext)

    return (
        <Flex justify="center" align="center" mr="2">
            <Icon
                as={FaArrowAltCircleLeft}
                fontSize="2xl"
                cursor="pointer"
                onClick={() => scrollPrev()}
            />
        </Flex>
    )
}

const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext)

    return (
        <Flex justify="center" align="center" ml="2">
            <Icon
                as={FaArrowAltCircleRight}
                fontSize="2xl"
                cursor="pointer"
                onClick={() => scrollNext()}
            />
        </Flex>
    )
}

function ImageScrollbar({ data }) {
    return (
        <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            styled={{ overflow: 'hidden' }}
        >
            {data.map((item) => (
                <Box key={item.id} width="910px" p="1" overflow="hidden">
                    <Image
                        placeholder="blur"
                        blurDataURL={item.url}
                        src={item.url}
                        alt={item.title}
                        width='1000'
                        height='500'
                    />
                </Box>
            ))}
        </ScrollMenu>
    )
}

export default ImageScrollbar
