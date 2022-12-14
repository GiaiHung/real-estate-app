import Banner from '../components/Banner'
import Property from '../components/Property'
import { Flex } from '@chakra-ui/react'

import { baseUrl, fetchApi } from '../utils/fetchApi'

export default function Home({ propertiesForSale, propertiesForRent }) {
    return (
        <div>
            <Banner
                purpose="RENT A HOME"
                title1="Rental Homes for"
                title2="Everyone"
                desc1=" Explore from Apartments, builder floors, villas"
                desc2="and more"
                buttonText="Explore Renting"
                linkName="/search?purpose=for-rent"
                imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
            />

            {/* Fetch api */}
            <Flex wrap="wrap" justify='center'>
                {propertiesForRent.map((property) => (
                    <Property property={property} key={property.id} />
                ))}
            </Flex>

            <Banner
                purpose="BUY A HOME"
                title1=" Find, Buy & Own Your"
                title2="Dream Home"
                desc1=" Explore from Apartments, land, builder floors,"
                desc2=" villas and more"
                buttonText="Explore Buying"
                linkName="/search?purpose=for-sale"
                imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
            />

            {/* Fetch api */}
            <Flex wrap="wrap">
                {propertiesForSale.map((property) => (
                    <Property property={property} key={property.id} />
                ))}
            </Flex>
        </div>
    )
}

export async function getStaticProps() {
    const propertiesForSale = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
    )
    const propertiesForRent = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
    )

    return {
        props: {
            propertiesForSale: propertiesForSale?.hits,
            propertiesForRent: propertiesForRent?.hits,
        },
    }
}
