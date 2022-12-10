import { Repository } from '@airport/server';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { refresh } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getRootRepositories } from '../api';
import './ChildRepositoriesPage.css';

const RepositoriesPage: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [present] = useIonToast()

  useEffect(() => {
    getRootRepositories(setRepositories, present)
  }, [])

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
          <IonFabButton onClick={e => getRootRepositories(setRepositories, present)}>
            <IonIcon icon={refresh} />
          </IonFabButton>
        </IonFab>
        {repositories.map(repository =>
          <IonItem key={repository.GUID}>
            {repository.name}
          </IonItem>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RepositoriesPage;
