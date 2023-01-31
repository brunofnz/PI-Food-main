import './App.css';
import { Route, Switch} from 'react-router-dom';
import { LandingPage, AddRecipe, DetailRecipe, Home, PageNotFound404 } from './views';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/recipes' component={Home}/>
        <Route exact path='/recipes/:idRecipe' component={DetailRecipe}/>
        <Route exact path='/add' component={AddRecipe}/>
        <Route path='*' component={PageNotFound404} />
      </Switch>
    </>
  );
}

export default App;
