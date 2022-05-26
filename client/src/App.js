import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/Landing/Landing'
import Home from './components/Home/Home'
import DetailPage from './components/Details/Details'
// import CreateGame from './components/Create/Create'
// import AboutPage from './components/About/About'
// import NotFound from './components/Notfound/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/home'>
            <Home/>
          </Route>
          {/* <Route path='/create'>
            <CreateGame />
          </Route> */}
          <Route path='/details/:id'>
            <DetailPage/>
          </Route>
          {/* <Route path='/about'>
            <AboutPage />
          </Route>  */}
          {/* <Route path='*'>
            <NotFound/>
          </Route>  */}
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
