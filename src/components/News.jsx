import React, { useState } from 'react'
import moment from 'moment'
import Loader from './Loader'
import styled from 'styled-components'
import { Row, Col, Card, Typography, Select } from 'antd'
import { useCryptoNewsApi } from '../hooks/useCryptoNewsApi'
import { useCryptoApi } from '../hooks/useCryptoApi'

const { Title, Text } = Typography
const { Option } = Select

const News = ({sliced}) => {
    const [searchTerm, setSearchTerm] = useState('Cryptocurrencies')

    const { data: coinNews } = useCryptoNewsApi(searchTerm)
    const { data: dataCoins } = useCryptoApi('/coins')

    const randomImg = 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/02/CRYPTOCURRENCY-2.jpg?auto=format&q=60&w=1860&h=1860&fit=crop&crop=faces'
    
    const slicingNews = sliced ? 6 : 20

    if(!coinNews) return <Loader/>

    return (
        <NewsContainer sliced={sliced}>
            {!sliced && (
                <Select 
                    placeholder="Select category coin news"
                    onChange={(val) => setSearchTerm(val)}
                    className="select_news">
                        <Option value="Cryptocurrencies">Cryptocurrencies</Option>
                        {dataCoins?.data?.coins?.map((coin) => (
                            <Option key={coin.id} value={coin.name}>{coin.name}</Option>
                        ))}
                </Select>
            )}
            <Row gutter={[20, 20]}>
                {coinNews?.slice(0, slicingNews).map((coin, idx) => (
                    <Col xs={24} sm={12} xl={8} key={idx}>
                        <Card className="news_card">
                            <a href={coin.url} target="_blank" rel="noreferrer">
                                <div className="news_card_heading">
                                    <Title level={5}>
                                        {coin.name.split(' ').length > 10 ? `${coin.name.split(' ').slice(0, 10).join(' ')}...` : coin.name}
                                    </Title>
                                    <img src={coin?.image?.thumbnail?.contentUrl || randomImg} alt="news_image"/>
                                </div>
                                <p>{coin.description.split(' ').length > 20 ? 
                                    `${coin.description.split(' ').slice(0, 20).join(' ')}...` : coin.description}
                                </p>
                                <div className="news_card_bottom">
                                    <img src={coin?.provider[0].image?.thumbnail?.contentUrl || randomImg} alt="image_provider"/>
                                    <Text>
                                        {moment(new Date(coin.datePublished).toDateString()).startOf('ss').fromNow()}
                                    </Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </NewsContainer>
    )
}


const NewsContainer = styled.div`
    padding: ${({sliced}) => sliced ? 0 : '40px'};
    .select_news {
        width: 220px;
        margin: 20px 0;
    }
    .news_card {
        p {
            margin-top: 20px;
        }
    }
    .news_card_heading {
        display: flex;
        h5 {
            margin-right: 10px;
        }
        img {
            width: 70px;
            height: 70px;
        }
    }
    .news_card_bottom {
        display: flex;
        align-items: center;
        img {
            width: 30px;
            height: 30px;
            margin-right: 20px;
        }
    }

    @media(max-width: 768px) {
        padding: ${({sliced}) => sliced ? 0 : '20px'};
    }
`;

export default News
