import React, { useState } from 'react'
import Loader from './Loader'
import millify from 'millify'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Row, Col, Card, Select } from 'antd'
import { useCryptoApi } from '../hooks/useCryptoApi'

const { Option } = Select

const Cryptocurrencies = ({sliced, history}) => {

    const [searchTerm, setSearchTerm] = useState('')
    const { data: dataCoins } = useCryptoApi('/coins')

    const randomImg = 'https://pict.sindonews.net/dyn/620/pena/news/2020/10/11/178/192434/wow-hampir-30-juta-warga-indonesia-punya-cryptocurrency-rdg.jpg'

    const slicingCoins = sliced ? 10 : 50

    const filteredCoins = dataCoins?.data?.coins?.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))


    if(!dataCoins) return <Loader/>

    

    return (
        <CryptoContainer sliced={sliced}>
            {!sliced && (
                <Select 
                    placeholder="Search coin" 
                    className="select_coins"
                    onChange={(val) => setSearchTerm(val)}> 
                        <Option value="">All Crypto</Option>
                        {dataCoins?.data?.coins?.map(coin => (
                            <Option value={coin.name} key={coin.id}>
                                {coin.name}
                            </Option>
                        ))}
                </Select>
            )}
            <Row gutter={[30, 30]}>
                {filteredCoins.slice(0, slicingCoins)?.map(crypto => (
                    <Col xs={24} sm={12} lg={8} xl={6} 
                        key={crypto.id}
                        onClick={() => history.push(`/crypto/${crypto.id}`)}>
                        <Card title={`${crypto.rank}. ${crypto.name}`} extra={<img src={crypto?.iconUrl || randomImg} alt="img_crypto"/>} hoverable>
                           <p>Price: {millify(crypto.price || 0)}</p>
                           <p>Market Cap: {millify(crypto.marketCap || 0)}</p>
                           <p>Change: {millify(crypto.change || 0)}</p>
                           <p>Total Supply: {millify(crypto.totalSupply || 0)}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </CryptoContainer>
    )
}

const CryptoContainer = styled.div`
    padding: ${({sliced}) => sliced ? 0 : '40px'};
    .select_coins {
        margin: 30px 0;
        width: 200px;
    }
    img{
        width: 35px;
        height: 35px;
    }

    @media(max-width: 768px) {
        padding: ${({sliced}) => sliced ? 0 : '20px'};
    }   
`;

export default withRouter(Cryptocurrencies)
