// Login.tsx
import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonHeader, IonToolbar, IonDatetime } from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    Register
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
                    <IonInput
                        type="password"
                        placeholder="Confirme Password"
                        value={cpassword}
                        onIonChange={(e) => setCPassword(e.detail.value!)}
                    />
                    <IonButton expand="full" onClick={handleRegister}>
                        Regiser
                    </IonButton>
                </form>
                <Link to="/login">Login</Link>
            </IonContent>
        </IonPage>
    );
};

export default Register;
