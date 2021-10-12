import {Route, Switch} from 'react-router';
import './App.css';
import Home from './components/Home/Home';
import Favorites from './components/Favorites/Favorites';
import DogDetail from './components/DogDetail/DogDetail';
import Inicio from './components/Inicio/Inicio';
import Nav from './components/Nav/Nav';

import CreateDog from './components/CreateDog/CreateDog';

function App() {

  return (
    <div className="App">
      <header>
        <Switch>
        <Route exact strict  path='/' component={Inicio} />
        <Route>
        <Route  path='/' component={Nav} />
        <Route exact path='/dogs' component={Home} />
        <Route exact path='/favorites' component={Favorites} />
        
        <Route exact path='/dogs/:id' component={DogDetail} />
        <Route exact path='/create_dog' component={CreateDog} />
        </Route>

        </Switch>
      </header>
    </div>
  );
}

export default App;
