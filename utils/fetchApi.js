import axios from 'axios'

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
    const { data } = await axios.get(url, {
        headers: {
            'X-RapidAPI-Key':
                '7a5e317144msh5de0458daf7262cp168dc1jsn751ed457ef1a',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
        },
    })

    return data
}
