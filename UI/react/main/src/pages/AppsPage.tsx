import { Application } from '@airport/web-airport';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { refresh } from 'ionicons/icons';
import { useState } from 'react';
import { getApplications, initialGet, LoadedComponentState } from '../api';
import './AppsPage.css';

const AppsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [present] = useIonToast()

  initialGet(LoadedComponentState.APPS, setApplications, present)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Apps</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Apps</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={e => getApplications(setApplications, present)}>
            <IonIcon icon={refresh} />
          </IonFabButton>
        </IonFab>
        {applications.map(application =>
          <IonItem>
            Domain: {application.domain.name}
            <br />
            Name: {application.name}
          </IonItem>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AppsPage;
