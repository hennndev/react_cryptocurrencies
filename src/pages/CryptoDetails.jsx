import React from 'react'
import millify from 'millify'
import styled from 'styled-components'
import Loader from '../components/Loader'
import { Col, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import HTMLReactParser from 'html-react-parser'
import { useCryptoApi } from '../hooks/useCryptoApi'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Title, Text } = Typography

const CryptoDetails = () => {
    const { id } = useParams()
    const { data: cryptoDetails } = useCryptoApi(`/coin/${id}`)
    const coin = cryptoDetails?.data?.coin

    if(!cryptoDetails) return <Loader/>

    return (
        <CryptoDetailsContainer>
            <Col className="crypto_heading">
                <Title level={3}>{`${coin?.name} (${coin?.slug}) Price`}</Title>
                <p>{coin?.name} live price in US dollars. View value statistics, market cap and supply</p>
            </Col>
            <Col className="crypto_details_stats">
                <Col className="crypto_value_statistic">
                    <Col className="crypto_statistic_heading">
                        <Title level={4}>
                            {coin?.name} Value Statistics
                        </Title>
                        <p>An overview showing the stats {coin?.name}</p>
                    </Col>
                    <Col className="crypto_statistics">
                        <div className="crypto_stat">
                            <Title level={5}>
                                <DollarCircleOutlined/>
                                Price to USD
                            </Title>
                            <Text>${millify(coin?.price)}</Text>
                        </div>
                        <div className="crypto_stat">
                            <Title level={5}>
                                <NumberOutlined/>
                                Rank
                            </Title>
                            <Text>{millify(coin?.rank)}</Text>
                        </div>
                        <div className="crypto_stat">
                            <Title level={5}>
                                <FundOutlined/>
                                24h Volume
                            </Title>
                            <Text>${millify(coin?.volume)}</Text>
                        </div>
                        <div className="crypto_stat">
                            <Title level={5}>
                                <MoneyCollectOutlined/>
                                Market Cap
                            </Title>
                            <Text>${millify(coin?.marketCap)}</Text>
                        </div>
                        <div className="crypto_stat">
                            <Title level={5}>
                                <TrophyOutlined/>
                                Daily avg
                            </Title>
                            <Text>${millify(coin?.allTimeHigh?.price)}</Text>
                        </div>
                    </Col>
                </Col>




                <Col className="crypto_value_statistic">
                    <Col className="crypto_statistic_heading">
                        <Title level={4}>
                            Other Value Statistics
                        </Title>
                        <p>An overview showing the other {coin?.name}</p>
                    </Col>
                    <Col className="crypto_statistics">
                        <div className="crypto_stat">
                            <Title level={5}>
                                <FundOutlined/>
                                Number Of Markets
                            </Title>
                            <Text>{millify(coin?.numberOfMarkets)}</Text>
                        </div>
                        <div className="crypto_stat">
                            <Title level={5}>
                                <ThunderboltOutlined/>
                                Number Of Exchanges
                            </Title>
                            <Text>{millify(coin?.numberOfExchanges)}</Text>
                        </div>
                        <div className="crypto_stat">
                            <Title level={5}>
                                <ExclamationCircleOutlined/>
                                Approved Supply
                            </Title>
                            <Text>{coin?.approvedSupply ? <CheckOutlined/> : <StopOutlined/>}</Text>
                        </div>
                        <div className="crypto_stat">
                            <Title level={5}>
                                <MoneyCollectOutlined/>
                                Total Supply
                            </Title>
                            <Text>${millify(coin?.totalSupply || 0)}</Text>
                        </div>
                        <div className="crypto_stat">
                            <Title level={5}>
                                <TrophyOutlined/>
                                Circulating Supply
                            </Title>
                            <Text>${millify(coin?.circulatingSupply)}</Text>
                        </div>
                    </Col>  
                </Col>
            </Col>

            <Col className="crypto_desc">
                <Col className="crypto_desc_heading">
                    <Title level={4}>What is {coin?.name} ?</Title>
                </Col>
                <Col>
                    {HTMLReactParser(coin?.description)}
                </Col>
                <Col className="crypto_links">
                    <Title level={4}>Links {coin?.name}</Title>
                    <Col className="links">
                        {coin?.links.map(link => (
                            <a href={link.url} key={link.url} target="_blank" rel="noreferrer">
                                {link.url}
                            </a>
                        ))}
                    </Col>
                </Col>
            </Col>
        </CryptoDetailsContainer>
    )
}

const CryptoDetailsContainer = styled.div`
    padding: 40px;
    .crypto_heading {
        color: gray;
        margin-bottom: 50px;
        text-align: center;  
        h3 {
            color: var(--primary);        
        }
        p {
            font-size: 16px;
        }
    }


    .crypto_details_stats {
        display: flex;
        justify-content: space-around;
    }

    .crypto_value_statistic {
        margin-bottom: 20px;
    }

    .crypto_statistic_heading {
        text-align: center;
        h4 {
            color: var(--primary);
        }
        p {
            color: gray;
            font-size: 15px;
        }
    }

    .crypto_stat {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        border: 1px solid #ebebeb;
        padding: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        h5 {
            display: flex;
            align-items: center;
            margin: 0;
            color: #444;
            font-size: 15px;
            svg {
                margin-right: 5px;
                font-size: 16px;
            }
        }
        :hover {
            transform: scale(1.1);
        }
    }


    .crypto_desc_heading {
        margin-top: 30px;
        h4 {
            color: var(--primary);
            margin-bottom: 20px;
        }
    }

    .crypto_links {
        margin-top: 30px;
        h4 {
            color: #444;
        }
        .links {
            display: flex;
            flex-direction: column;
            a {
                margin-bottom: 10px;
            }
        }
    }

    @media(max-width: 768px) {
        .crypto_details_stats {
            flex-direction: column;
        }
    }
`;

export default CryptoDetails
