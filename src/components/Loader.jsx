import React from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons'

const Loader = () => {

    const antIcon = <LoadingOutlined style={{fontSize: '50px'}}/>

    return (
        <LoaderContainer>
            <Spin indicator={antIcon}/>
        </LoaderContainer>
    )
}

const LoaderContainer = styled.div`
    width: 100%;
    display: grid;
    place-items: center;
    margin-top: 150px;
    @media(max-width: 768px) {
        
    }
`;      

export default Loader
