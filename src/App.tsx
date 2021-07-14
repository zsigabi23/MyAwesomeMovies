import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './screens/Home';
import MovieDetails from './screens/MovieDetails';
import Movies from './screens/Movies';
import { GlobalStyle } from './styles/global';
import { theme } from './utils/theme';
import About from './screens/About/index';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/movie/:id">
          <MovieDetails />
        </Route>
      </Switch>
    </Router>
  )
}

const App: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;