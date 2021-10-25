import { useEffect, useState } from 'react'
import axios from 'axios'

export const useCryptoNewsApi = (query) => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://bing-news-search1.p.rapidapi.com/news/search?q=${query}&safeSearch=Off&textFormat=Raw&count=100`, {
            headers: {
                'Content-Type' : 'application.json',
                "x-bingapis-sdk": "true",
                "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
                "x-rapidapi-key": "018e044843msh163c000fcfab21dp19d6e1jsn0179954e2a9c"
            }
        }).then((res) => {
            setData(res.data.value)
            setIsLoading(false)
        }).catch(error => {
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

