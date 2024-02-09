// Login.tsx
import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonHeader, IonToolbar } from '@ionic/react';

const Home: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log(email, password);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    Home
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form>
                    <IonInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onIonChange={(e) => setEmail(e.detail.value!)}
                    />
                    <IonInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        onIonChange={(e) => setPassword(e.detail.value!)}
                    />
                    <IonButton expand="full" onClick={handleLogin}>
                        Login
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default Home;
