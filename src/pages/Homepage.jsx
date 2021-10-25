import React from 'react'
import millify from 'millify'
import News from '../components/News'
import styled from 'styled-components'
import Loader from '../components/Loader'
import { useCryptoApi } from '../hooks/useCryptoApi'
import { Typography, Row, Col, Statistic } from 'antd'
import Cryptocurrencies from '../components/Cryptocurrencies'

const { Title } = Typography

const Homepage = () => {

    const { data: dataCoins } = useCryptoApi('/coins')
    const dataStats = dataCoins?.data?.stats

    if(!dataCoins) return <Loader/>


    return (
        <HomepageContainer>
            <div className="global_stats">
                <Title level={3}>
                    Global Crypto Stats
                </Title>
                <Row>
                    <Col span={12}>
                        <Statistic title="Total Cryptocurrencies" value={millify(dataStats.total)}/>
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Exchanges" value={millify(dataStats.totalExchanges)}/>
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Market Cap" value={millify(dataStats.totalMarketCap)}/>
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total 24h Volume" value={millify(dataStats.total24hVolume)}/>
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Markets" value={millify(dataStats.totalMarkets)}/>
                    </Col>
                </Row>
            </div>
            <div className="currency">
                <Title level={3}>
                    Top 10 Currency in the World
                </Title>
                <Cryptocurrencies sliced/>
            </div>
            <div className="news">
                <Title level={3}>
                    Latest News about Cryptocurrencies
                </Title>
                <News sliced/>
            </div>
        </HomepageContainer>
    )
}

const HomepageContainer = styled.div`
    padding: 40px;
    h3 {
        color: var(--primary);
        margin-bottom: 20px;
    }
    .global_stats, .currency, .news {
        margin-bottom: 30px;
    }
    @media(max-width: 768px) {
        padding: 20px;
    }
`;


export default Homepage
