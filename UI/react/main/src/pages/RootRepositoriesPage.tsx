import { Repository } from '@airport/server';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { refresh } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getRootRepositories } from '../api';
import './RootRepositoriesPage.css';

const RepositoriesPage: React.FC = () => {
  const [rootRepositories, setRootRepositories] = useState<Repository[]>([])
  const [present] = useIonToast()

  useEffect(() => {
    getRootRepositories(setRootRepositories, present)
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Root Repositories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Root Repositories</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={e => getRootRepositories(setRootRepositories, present)}>
            <IonIcon icon={refresh} />
          </IonFabButton>
        </IonFab>
        {rootRepositories.map(repository =>
          <IonItem key={repository.GUID}>
            {repository.name}
          </IonItem>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RepositoriesPage;
