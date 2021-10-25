import { useEffect, useState } from 'react'
import axios from 'axios'

export const useCryptoApi = (query) => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://coinranking1.p.rapidapi.com/${query}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
                'x-rapidapi-key': '018e044843msh163c000fcfab21dp19d6e1jsn0179954e2a9c'
            }
        }).then((res) => {
            setData(res.data)
            setIsLoading(false)
        }).catch((error) => {
            setIsError(error.message)
            setIsLoading(false)
        })
    }, [query])

    return {
        data,
        isLoading,
        isError
    }
}

