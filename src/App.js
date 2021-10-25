import React from 'react'
import 'antd/dist/antd.css'
import News from './components/News'
import styled from 'styled-components'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import CryptoDetails from './pages/CryptoDetails'
import Cryptocurrencies from './components/Cryptocurrencies'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


const App = () => {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <div className="routes">
          <Switch>
            <Route path="/" exact component={Homepage}/>
            <Route path="/cryptocurrencies" component={Cryptocurrencies}/>
            <Route path="/crypto/:id" component={CryptoDetails}/>
            <Route path="/news" component={News}/>
          </Switch>
        </div>
      </AppContainer>
    </Router>
  )
}


const AppContainer = styled.div`
  display: flex;
  .routes {
    flex: 0.83;
  }
  @media(max-width: 768px) {
    flex-direction: column;
  }
`;

export default App
