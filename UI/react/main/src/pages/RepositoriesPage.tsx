import { Repository } from '@airport/web-airport';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { refresh } from 'ionicons/icons';
import { useState } from 'react';
import { getRepositories, initialGet, LoadedComponentState } from '../api';
import './RepositoriesPage.css';

const RepositoriesPage: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [present] = useIonToast()

  initialGet(LoadedComponentState.REPOSITORIES, setRepositories, present)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositories</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={e => getRepositories(setRepositories, present)}>
            <IonIcon icon={refresh} />
          </IonFabButton>
        </IonFab>
        {repositories.map(repository =>
          <IonItem>
            Name: {repository.name}
          </IonItem>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RepositoriesPage;
