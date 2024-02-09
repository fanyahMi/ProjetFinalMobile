import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import React from 'react';
import Annonce from './pages/Annonces';
import Inscription from './pages/Inscription';
import DetailAnnonceComponent from './components/DetailAnnonceComponent';
import { AnnonceModel } from './data/AnnonceModel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DetailAnnonce from './pages/DetailAnnonce';
import Ajout from './pages/Ajout/Ajout';
import Liste_annonce from './pages/Liste_annonce';
import AjoutMarque from './pages/Ajout/MarqueP';
import AjoutCategorie from './pages/Ajout/CategorieP';
import ModifMarque from './pages/Modification/MarqueM';
import ModifCategorie from './pages/Modification/CategorieM';
import Recherche from './pages/Recherche';
import Propriete from './components/Propriete';
import Modifier from './pages/Modification/AnnonceM';

setupIonicReact();



const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
        <Menu />
          <IonRouterOutlet id="main">
            <Route path="/Menu" exact={true}>
              <Redirect to="/folder/Liste des anonces" />
            </Route>
            <Route path="/Inscription" exact={true}>
              <Inscription />
            </Route>
            <Route path="/" exact={true}>
              <Login />
            </Route>
            <Route path="/folder/:name" exact={true}>
              <Page />
            </Route>
            <Route path="/detail/:id" exact={true}>
              <DetailAnnonce  />
            </Route>
            <Route path="/liste" exact={true}>
              <Liste_annonce  />
            </Route>
            <Route path="/Ajouter/Marques" exact={true}>
              <AjoutMarque  />
            </Route>
            <Route path="/Ajouter/Categories" exact={true}>
              <AjoutCategorie />
            </Route>
            <Route path="/Ajout" exact={true} component={Ajout} />
            <Route path="/Modification/Marques/:id" exact={true}>
                <ModifMarque />
            </Route>
            <Route path="/Modification/Categories/:id" exact={true}>
                <ModifCategorie />
            </Route>
            <Route path="/Recherche" exact={true} >
              <Recherche />
            </Route>
            <Route path="/Modifier/:id" exact={true} >
              <Modifier />
            </Route>
            
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
