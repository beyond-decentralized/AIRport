import { Repository } from '@airport/web-airport';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { refresh } from 'ionicons/icons';
import { useState } from 'react';
import { getRepositories } from '../api';
import './RepositoriesPage.css';

const RepositoriesPage: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([])

  getRepositories(setRepositories)

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
          <IonFabButton onClick={e => getRepositories(setRepositories)}>
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
