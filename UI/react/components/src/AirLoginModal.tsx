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
    const [canSignUp, setCanSignUp] = useState(false)
    const [isOpen, setIsOpen] = useState(true)

    function setUsernameValue(
        username: string
    ) {
        setUsername(username)
        doSetCanSignUp(username, password)
    }

    function setPasswordValue(
        password: string
    ) {
        setPassword(password)
        doSetCanSignUp(username, password)
    }

    function doSetCanSignUp(
        username: string,
        password: string
    ): void {
        setCanSignUp(password.trim().length >= 3
            && username.trim().length >= 3)
    }

    function signUp() {
        if (!canSignUp) {
            alert("Username and password must be at least 3 characters long")
            return
        }
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
                type="password"
                value={password}
                onIonChange={e => setPasswordValue(e.detail.value as string)} />
        </IonItem>
        <IonItem>
            <IonButton
                disabled={!canSignUp}
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
