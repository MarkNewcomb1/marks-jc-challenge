import { Route, Switch } from 'react-router-dom';
import { List } from './components/List';
import { AddOrUpdate } from './components/AddOrUpdate';

function App() {



  return (
    <div className="container bg-light pt-4 pb-4">
      <Switch>
      <Route exact path='/' component={List} />
      <Route path='/add' component={AddOrUpdate} />
      <Route path='/edit/:id' component={AddOrUpdate} />
      </Switch>
    </div>
  );
}

export default App;
