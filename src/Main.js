import React from 'react';
import {Route, NavLink, HashRouter, Switch} from 'react-router-dom';

import Home from './Home';
import Stuff from './Stuff';

import Puzzle from './components/Puzzle/Puzzle';
import FoodSearch from './components/FoodSearch/FoodSearch';

import classes from './Main.module.css';

class Main extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <nav className="navbar fixed-top navbar-expand-sm bg-danger navbar-dark">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">
                  <i className="fas fa-calculator"></i>&nbsp;Puzzle
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/food">
                  <i className="fas fa-utensils"></i>&nbsp;กินอะไรดี
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="container" style={{marginTop: '64px'}}>
            <div className="row">
              <div className="col"></div>
              <div className="col-8">
                <Switch>
                  <Route exact path="/" component={Puzzle} />
                  <Route path="/food" component={FoodSearch} />
                </Switch>
              </div>
              <div className="col"></div>
            </div>
          </div>
          <footer>
            Footer
          </footer>
        </div>
      </HashRouter>
    )
  }
}

export default Main;