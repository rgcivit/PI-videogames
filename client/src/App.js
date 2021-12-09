import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import VgameCreate from './componentes/VgameCreate'
import LandingPage from './componentes/LandingPage'
import Home from './componentes/Home';
import Detail from './componentes/Detail'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={Home} />
          <Route path='/creategame' component={VgameCreate}/>
          <Route path='/videogame/:id' component={Detail}/>
        </Switch>  
      </div>  
    </BrowserRouter>
  );
}

export default App;
