import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Typography, Menu } from 'antd'
import { HomeOutlined, LineChartOutlined, BulbOutlined, MenuOutlined  } from '@ant-design/icons'

const { Title } = Typography
const { Item } = Menu

const Navbar = () => {
    const [isActive, setIsActive] = useState(false)

    const handleClick = () => setIsActive(!isActive)
    const handleClose = () => setIsActive(false)

    return (
        <NavbarContainer isActive={isActive}>
            <div className="logo_navbar">
                <Title level={3}>Cryptoverse</Title>
                <MenuOutlined className="menu_bar" onClick={handleClick}/>
            </div>
            <div className="menu_navbar">
                <Menu theme="dark">
                    <Item key="1" icon={<HomeOutlined/>} onClick={handleClose}>
                        <Link to="/">Homepage</Link>
                    </Item>
                    <Item key="2" icon={<LineChartOutlined/>} onClick={handleClose}>
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                    </Item>
                    <Item key="4" icon={<BulbOutlined/>} onClick={handleClose}>
                        <Link to="/news">News</Link>
                    </Item>
                </Menu>
            </div>
        </NavbarContainer>
    )
}

const NavbarContainer = styled.div`
    background-color: rgb(0, 21, 41);
    height: 100vh;
    position: sticky;
    top: 0;
    left: 0;
    flex: 0.17;
    padding-top: 15px;
    .logo_navbar {
        display: flex;
        align-items: center;
        justify-content: center;
        h3 {
            text-align: center;
            color: var(--primary);
            margin: 0;
        }
    }
    .menu_bar {
        display: none;
    }
    .menu_navbar {
        margin-top: 30px;
    }
    
    @media(max-width: 768px) {
        right: 0;
        width: 100%;
        padding-top: 0;
        flex: 1;
        position: static;
       .logo_navbar{
           justify-content: space-between;
           padding: 15px;
       }
       .menu_bar{
            display: block;
            cursor: pointer;
            svg{
                color: #fff;
                font-size: 20px;
           }
       }
        .menu_navbar {
            margin-top: 10px;
            display: ${({isActive}) => isActive ? 'block' : 'none'};
        }
    }
`;

export default Navbar
