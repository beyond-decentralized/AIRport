import { Repository } from '@airport/server';
import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { chevronBackOutline, documentOutline, eyeOutline, refresh } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getRootRepositories } from '../api';
import './RootRepositoriesPage.css';

const RepositoriesPage: React.FC = () => {
  const [rootRepositories, setRootRepositories] = useState<Repository[]>(() => null as any)
  const [present] = useIonToast()

  useEffect(() => {
    getRootRepositories(setRootRepositories, present).then()
  }, [])

  let repositoriesFragment
  if (!rootRepositories) {
    repositoriesFragment =
      <IonItem>
        Loading ...
      </IonItem>
  } else if (!rootRepositories.length) {
    repositoriesFragment =
      <IonItem>
        No Repositories present
      </IonItem>
  } else {
    repositoriesFragment =
      <>
        {rootRepositories.map(repository =>
          <IonItem key={repository.GUID}>
            <div>
              <div className="root-repository-name">
                {repository.name}
              </div>
              <div>
                <IonButton
                  href={repository.uiEntryUri}
                  fill="clear"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <IonIcon slot="start" icon={eyeOutline}></IonIcon>
                  View
                </IonButton>
                <IonButton
                  fill="clear"
                  routerLink={"./repository/" + repository.GUID}
                >
                  <IonIcon slot="start" icon={documentOutline}></IonIcon>
                  Details
                </IonButton>
              </div>
            </div>
          </IonItem>
        )}
      </>
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" icon={chevronBackOutline} />
          </IonButtons>
          <IonTitle>Root Repositories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={e => getRootRepositories(setRootRepositories, present)}>
            <IonIcon icon={refresh} />
          </IonFabButton>
        </IonFab>
        {repositoriesFragment}
      </IonContent>
    </IonPage >
  );
};

export default RepositoriesPage;
