import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { useRef, useState } from "react";

export function AirLoginModal({
    onWillDismiss,
    triggerId
}: {
    onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => void,
    triggerId: string
}) {
    const modal = useRef<HTMLIonModalElement>(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isOpen, setIsOpen] = useState(true)

    let canSignUp = false

    function setUsernameValue(
        username: string
    ) {
        setUsername(password)
        setCanSignUp(username, password)
    }

    function setPasswordValue(
        password: string
    ) {
        setPassword(password)
        setCanSignUp(username, password)
    }

    function setCanSignUp(
        username: string,
        password: string
    ): void {
        canSignUp = password.trim().length >= 3
            && username.trim().length >= 3
    }

    function signUp() {
        setIsOpen(false)
        modal.current?.dismiss({
            email: username + '@random-email-provider.com',
            password,
            username
        }, 'signUp')
    }

    const signUpView = <>
        <IonItem>
            <IonLabel position="stacked">Username</IonLabel>
            <IonInput
                value={username}
                onIonChange={e => setUsernameValue(e.detail.value as string)} />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
                value={password}
                onIonChange={e => setPasswordValue(e.detail.value as string)} />
        </IonItem>
        <IonItem>
            <IonButton
                disabled={canSignUp}
                expand="block"
                onClick={_ => signUp()}
            >Sign Up</IonButton>
        </IonItem>
    </>


    return (
        <IonModal
            isOpen={isOpen}
            onWillDismiss={e => onWillDismiss(e)}
            ref={modal}
            trigger={triggerId}
        >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sign Up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {signUpView}
            </IonContent>
        </IonModal>
    )
}
