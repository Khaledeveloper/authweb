import logo from './logo.svg';
import './App.css';
import Header from './components/ui/Header'
import RegisterPage from './pages/auth/register'
import Home from './pages/home'
import Login from './components/forms/signIn'
import Footer from './components/ui/Footer'
import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./components/ui/Theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/login' component={Login} />

        </Switch>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
