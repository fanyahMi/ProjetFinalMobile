import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonDatetime, IonFooter, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";

const Inscription: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword , setShowConfPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showInscrit, setShowInscrit] = useState(false);
    //Data
    const [password, setPassword] = useState<string>('');
    const [confPassword , setConfPassWord] = useState<string>('');
    const [nom , setNom] = useState<string>('');
    const [prenoms , setPrenom] = useState<string>('');
    const [email , setEmail] = useState<string>('');
    const [dtn , setDtn] = useState<string>('');
    const [genre, setGenre] = useState<number>(0);
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
        setShowConfPassword(!showConfPassword);
    };
    const history = useHistory();

   

    const handleRegister = async () => {
        
        try {
            const data = new FormData();
            data.append('email',email);
            data.append('password2' , password);
            data.append('password' , confPassword);
            data.append('genre' , genre.toString());
            data.append('nom' , nom);
            data.append('prenom' , prenoms);
            data.append('date_naissance' , dtn);

            if (genre !== null) {
                data.append('genre', String(genre));
            }

            const response = await fetch('https://wscloudfinal-production.up.railway.app/api/auth/v1/inscription', {
                method: 'POST',
                body: data,
            });
            const responsetoken = await response.json();
            if (response.ok) {
                const token = await responsetoken.data;
                console.log("tongaaaaaaaaaaaa");
                // console.log(token);
                // sessionStorage.setItem('token', token);
                // history.push("/");
                // window.location.reload();
                setShowInscrit(true);

            } else {
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const getData = () => {  
        console.log(nom);
        console.log(prenoms);
        console.log(email);
        console.log(password);
        console.log(confPassword);
    }
    const options = [
        { label: 'Homme', value: 1 },
        { label: 'Femme', value: 2 },
      ];

    const handleOkClick = () => {
        // Redirection vers la page d'accueil ("/")
        history.push("/");
    };

    return (
        <IonPage>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle >Sign up</IonCardTitle>
                    <IonCardSubtitle>Create your account</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonInput label="Nom" labelPlacement="floating" fill="outline" placeholder="Enter votre nom" value={nom} onIonChange={(e) => setNom(e.detail.value!)}></IonInput>
                    <br />
                    <IonInput label="Prenoms" labelPlacement="floating" fill="outline" placeholder="Enter votre prenoms" value={prenoms} onIonChange={(e) => setPrenom(e.detail.value!)}></IonInput>
                    <br />
                    <IonLabel>Genre :</IonLabel>
                    <br />
                    {options.map((option) => (
                        <div key={option.value} className="ion-padding-start">
                            <IonCheckbox
                            checked={option.value === genre}
                            value={option.value}
                            onIonChange={(e) => setGenre(e.detail.value)}
                            />
                            <IonLabel>{option.label}</IonLabel>
                        </div>
                    ))}

                    <br />
                    <IonInput label="Email" labelPlacement="floating" fill="outline" placeholder="Enter votre email" value={email} onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                    <br />
                    <IonInput type="date" labelPlacement="floating" fill="outline" label="Date de naissance" value={dtn} onIonChange={(e) =>setDtn(e.detail.value!) }></IonInput>
                    <br />
                    <IonInput label="Password" counter= {true} minlength={8} type={showPassword ? 'text' : 'password'} value={password} labelPlacement="floating" fill="outline" placeholder="Enter password" onIonChange={(e) => setPassword(e.detail.value!)} clearInput={true}></IonInput>
                    <br />
                    <IonInput label="Password" counter= {true} minlength={8} type={showConfPassword ? 'text' : 'password'} value={confPassword} labelPlacement="floating" fill="outline" placeholder="Confirmation password" onIonChange={(e) => setConfPassWord(e.detail.value!)} clearInput={true}></IonInput> 
                    <br />
                    
                    <IonCheckbox slot="end" checked={showPassword} onIonChange={handleToggleShowPassword} />
                    <IonLabel> Affiche le mot de passe</IonLabel>
                    <br />
                    <IonButton fill="outline" routerLink="/login">Annuler</IonButton>
                    <IonButton color="success" onClick={handleRegister} fill="outline" >Valider</IonButton>
                </IonCardContent>

                <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => setShowAlert(false)}
                        header="Verifier vos donnees Une erreur ses produits. 
                                Les donnes ne sont pas inserer !"
                        cssClass="custom-alert"
                        buttons={[
                            {
                                text: 'Ok',
                                cssClass: 'alert-button-confirm',
                                handler: handleOkClick
                            },
                        ]}
                    ></IonAlert>
                    <IonAlert
                        isOpen={showInscrit}
                        onDidDismiss={() => setShowInscrit(false)}
                        header="Votre inscription a ete bien reçu !"
                        cssClass="custom-alert"
                        buttons={[
                            {
                                text: 'Ok',
                                cssClass: 'alert-button-confirm',
                                handler: handleOkClick
                            },
                        ]}
                    ></IonAlert>
            </IonCard>
        </IonPage>
    );
}

export default Inscription;