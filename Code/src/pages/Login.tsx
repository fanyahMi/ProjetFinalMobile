// Login.tsx
import React, { useState } from 'react';
import { IonPage, IonInput, IonButton , IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCheckbox, IonLabel, IonAlert } from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';
const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const history = useHistory();

    const handleLogin = async () => {
        
        try {
            const data = new FormData();
            data.append('email',email);
            data.append('mdp' , password);

            const response = await fetch('https://wscloudfinal-production.up.railway.app/api/auth/v1/login', {
                method: 'POST',
                body: data,
            });
            const responsetoken = await response.json();
            if (response.ok) {
                const token = await responsetoken.data;
                console.log(responsetoken);
                sessionStorage.setItem('token', token);
                history.push("/Menu");
                window.location.reload();
            } else {
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };


    return (
        <IonPage>
            <IonCard style={{marginTop: "10%" }}>
                <img alt="Silhouette of mountains" src="/Vaika1.png" />
                <IonCardHeader>
                    <IonCardTitle>Login</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonInput 
                        label="Email" 
                        type='email' 
                        labelPlacement="floating" 
                        fill="outline" 
                        placeholder="Enter Email ..." 
                        value={email} 
                        onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                    <br />
                    <IonInput 
                        label="Password" 
                        labelPlacement="floating" 
                        fill="outline" 
                        placeholder="Enter mot de passe"
                        counter= {true} minlength={8} type={showPassword ? 'text' : 'password'}
                        value={password}
                        onIonChange={(e) => setPassword(e.detail.value!)}
                        clearInput={true}></IonInput>
                    <br />
                    <IonCheckbox slot="end" checked={showPassword} onIonChange={handleToggleShowPassword} />
                    <IonLabel> Affiche le mot de passe</IonLabel>
                    <br />
                    <IonButton expand="block"  onClick={handleLogin}>Log in</IonButton>
                    <IonButton routerLink='/Inscription' color="success" expand="block">Sign up</IonButton>

                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => setShowAlert(false)}
                        header="Le mot de passe ou le email est incorrect !"
                        cssClass="custom-alert"
                        buttons={[
                            {
                                text: 'Ok',
                                cssClass: 'alert-button-confirm',
                            },
                        ]}
                    ></IonAlert>
                </IonCardContent>
            </IonCard>
        </IonPage>
    );
}

export default Login;

