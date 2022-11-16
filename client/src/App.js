import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home';
import Details from './components/Details';
import Create from './components/Create';

function App() {
  return (
    <div className="App">
{/* se puede hcaer uin searchbar  */}
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={Home}/> 
      {/* navbar dentro de todos menos en landingpage */}
      <Route path='/details/:id' component={Details} />
      <Route path='/create' component={Create} />
      

    </div>
  );
}

export default App;
