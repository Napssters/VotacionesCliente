import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import { Home } from '../pages/Home/Home';
import { Admin } from '../pages/Admin/Admin';
import { Votantes } from '../pages/Votantes/Votantes';
import { Candidatos } from '../pages/Candidatos/Candidatos';
import { Elecciones } from '../pages/Elecciones/Elecciones';

function Router(){
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Admin} />
            <Route path="/registrarelecciones" component={Elecciones} />
            <Route path="/registrarvotantes" component={Votantes} />
            <Route path="/registrarcandidatos" component={Candidatos} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      );
}

export default Router;