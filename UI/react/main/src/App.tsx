import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { apps, briefcase, desktop, ellipse, square, triangle } from 'ionicons/icons';
import { AirLoginModal } from '@airport/ui-react-components'
import RepositoriesPage from './pages/RepositoriesPage';
import AppsPage from './pages/AppsPage';
import UIsPage from './pages/UIsPage';

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
import { useIonToast } from '@ionic/react';

/* Theme variables */
import './theme/variables.css';
import { signUp } from './api'

setupIonicReact();

const App: React.FC = () => {
  const [present] = useIonToast()

  return (
    <IonApp>
      <AirLoginModal
        onWillDismiss={e => signUp(e, present)}
        triggerId="bogus"
      />
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/repositories">
              <RepositoriesPage />
            </Route>
            <Route exact path="/applications">
              <AppsPage />
            </Route>
            <Route path="/user-interfaces">
              <UIsPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/repositories" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="repositories" href="/repositories">
              <IonIcon icon={briefcase} />
              <IonLabel>Repositories</IonLabel>
            </IonTabButton>
            <IonTabButton tab="applications" href="/applications">
              <IonIcon icon={apps} />
              <IonLabel>Apps</IonLabel>
            </IonTabButton>
            <IonTabButton tab="user-interfaces" href="/user-interfaces">
              <IonIcon icon={desktop} />
              <IonLabel>UIs</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>)
}

export default App;
