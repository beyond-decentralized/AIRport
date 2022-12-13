import { Repository } from '@airport/server';
import { IonAccordion, IonAccordionGroup, IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { chevronBackOutline, documentOutline, eyeOutline, refresh } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getRepository, RepositoryGroup } from '../api';
import './RepositoryPage.css';

const RepositoryPage: React.FC = () => {

  const { repositoryId: repositoryId } = useParams<{ repositoryId: string; }>();
  const [repository, setRepository] = useState<Repository>(() => null as any)
  const [repositoryGroups, setRepositoryGroups] = useState<RepositoryGroup[]>(() => [])
  const [present, dismiss] = useIonToast()

  function showToast(
    message: string,
    duration = 3000
  ): void {
    present(message)
    setTimeout(() => {
      dismiss()
    }, duration)
  }

  useEffect(() => {
    getRepository(
      repositoryId,
      setRepository,
      setRepositoryGroups,
      showToast
    ).then()
  }, [repositoryId])

  let repositoryGroupsFragment
  if (repositoryGroups && repositoryGroups.length) {
    repositoryGroupsFragment =
      <IonAccordionGroup>
        {repositoryGroups.map((repositoryGroup, groupIndex) =>
          <IonAccordion
            key={'repositoryGroup' + groupIndex}
            value={repositoryGroup.name}
          >
            <IonItem slot="header" color="light">
              <IonLabel>{repositoryGroup.name}</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              {repositoryGroup.repositoryNestings.map((repositoryNesting, nestingIndex) =>
                <IonItem
                  color="light"
                  key={nestingIndex}
                  slot="header"
                >
                  <IonLabel>{repositoryNesting.childRepositoryName}</IonLabel>
                  <IonButton
                    routerLink={'/repository/' + repositoryNesting.childRepository.GUID}
                    fill="clear"
                  >
                    <IonIcon slot="start" icon={documentOutline}></IonIcon>
                    Details
                  </IonButton>
                </IonItem>
              )}
            </div>
          </IonAccordion>
        )}
      </IonAccordionGroup>
  } else {
    repositoryGroupsFragment =
      <IonItem>
        No Nested Repositories found
      </IonItem>
  }

  let repositoryFragment
  if (!repository) {
    repositoryFragment =
      <IonItem>Loading ...</IonItem>
  } else {
    repositoryFragment =
      <>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={e => getRepository(repositoryId, setRepository, setRepositoryGroups, present)}>
            <IonIcon icon={refresh} />
          </IonFabButton>
        </IonFab>
        <IonItem>
          <IonLabel>Name:</IonLabel>
          {repository.name}
        </IonItem>
        <IonButton
          href={repository.uiEntryUri}
          fill="clear"
          rel="noopener noreferrer"
          target="_blank"
        >
          <IonIcon slot="start" icon={eyeOutline}></IonIcon>
          View
        </IonButton>
        {repositoryGroupsFragment}
      </>
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" icon={chevronBackOutline} />
          </IonButtons>
          <IonTitle>{repository ? 'Repository' : 'Loading ...'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {repositoryFragment}
      </IonContent>
    </IonPage>
  );
};

export default RepositoryPage;
