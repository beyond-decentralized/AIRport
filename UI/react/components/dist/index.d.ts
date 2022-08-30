import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

declare function AirLoginModal({ onWillDismiss, triggerId }: {
    onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => void;
    triggerId: string;
}): JSX.Element;

interface UserAccountInfo {
    email: string;
    password: string;
    username: string;
}

export { AirLoginModal, UserAccountInfo };
