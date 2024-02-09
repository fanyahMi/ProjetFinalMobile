import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonModal, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { AnnonceModel } from "../data/AnnonceModel"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { add, carOutline, list, remove } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { Utilisateur } from "../data/DetailVoitureModel";
import { useHistory } from "react-router";
export interface AnnonceDetail {
    data?:AnnonceModel;
} 

// 
const DetailAnnonceComponent: React.FC<AnnonceDetail> = (data) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);
    const i = 0;
    // data 

    const [utilisateurs , setUtilsateurs] = useState<Utilisateur[]>();

    // get 
    const [utilisateur , setUtilsateur] = useState<number | undefined>();
    const [prix_achat , setPrix_achat] = useState<number | undefined>();

    const [message, setMessage] = useState(
        "This modal example uses triggers to automatically open a modal when the button is clicked."
      );
    function confirm() {
        modal.current?.dismiss(input.current?.value, "confirm");
    }

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === "confirm") {
            setMessage(`Hello, ${ev.detail.data}`);
        }
    }

    useEffect(() => {

        const fetchUtilisateur = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch('https://wscloudfinal-production.up.railway.app/api/auth', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const responseData = await response.json();
                
                    // setCarburants(responseData.data);
                    setUtilsateurs(responseData.data);
                    // console.log(categories);
                } else {
                    console.error('Error fetching annonces:', response.status);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };
            
        fetchUtilisateur();
    }, []);
    const currentDate = new Date();

    const getdata = {
        annonce_id: data.data?.annonce_id,
        acheteur_id: utilisateur,
        prix_achat: prix_achat,
        date_achat: currentDate.toISOString()
    }

    const getVendu = async () => {
        console.log(JSON.stringify(getdata));
        
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('https://wscloudfinal-production.up.railway.app/api/v1/annonces/vendu', {
                method: 'POST',
                body:JSON.stringify(getdata),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.data);
            } else {
                console.error('Error fetching annonces:', response.status);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    const history = useHistory();

    const getSuprimer = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('https://wscloudfinal-production.up.railway.app/api/v1/annonces/'+ data.data?.annonce_id, {
                method: 'DELETE',
                body:JSON.stringify(getdata),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.data);
                history.push("/Menu");
                window.location.reload();
            } else {
                console.error('Error fetching annonces:', response.status);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    }
    return (
        <IonContent>
             <IonCard>
                <div id="carouselExampleAutoplaying" className="carousel slide pointer-event" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {data.data?.photos.map((photo) => (
                            <div className="carousel-item active">
                                <img src={photo.data} className="bd-placeholder-img bd-placeholder-img-lg d-block w-100" width="800" height="200" role="img" aria-label="Placeholder: Second slide" alt="Second slide" />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <IonCardHeader>
                    <IonCardTitle>{data.data?.acteur} <strong style={{ textAlign: 'right' }}> Lieu : {data.data?.lieu }</strong></IonCardTitle>
                    <IonCardSubtitle>Prix du produit : {data.data?.prix_vente} Ar</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonRow>
                        <IonCol size="10" >
                        { 
                        data.data?.statut === 2 ? 
                        <>
                            <IonButton id="open-modal" >
                                Vendu
                            </IonButton>
                            <IonModal
                                ref={modal}
                                onWillDismiss={(ev) => onWillDismiss(ev)}
                                trigger="open-modal"
                            >
                                <IonHeader>
                                <IonToolbar>
                                    <IonButtons slot="start">
                                    <IonButton onClick={() => modal.current?.dismiss()}>
                                        Cancel
                                    </IonButton>
                                    </IonButtons>
                                    <IonTitle>Ajouter Categories :</IonTitle>

                                </IonToolbar>
                                </IonHeader>
                                <IonContent className="ion-padding">
                                    <IonItem>
                                        <IonInput
                                        label=""
                                        labelPlacement="stacked"
                                        ref={input}
                                        type="number"
                                        placeholder="Prix d' achat ... "
                                        value={prix_achat} 
                                        onIonChange={(e) => setPrix_achat(parseFloat(e.detail.value!))}
                                        />
                                    </IonItem>
                                    <IonItem>
                                        <IonSelect
                                            interface="popover"
                                            toggleIcon={add}
                                            expandedIcon={remove}
                                            aria-label="Client" 
                                            value={utilisateur}
                                            onIonChange={(e) => setUtilsateur(parseInt(e.detail.value))}
                                            placeholder="Choisir l ache teur" 
                                            >
                                            {utilisateurs?.map((m) => (
                                                <IonSelectOption key={m.id_utilisateur} value={m.id_utilisateur}>{m.nom + "  " + m.prenom} </IonSelectOption>
                                            ))}
                                        </IonSelect>
                                    </IonItem>
                                    <IonButton 
                                    color={"secondary"}
                                    onClick={() => {
                                        getVendu();
                                        confirm();
                                    }}
                                    >
                                        Valider
                                    </IonButton>
                                </IonContent>
                            </IonModal>
                        </>
                        : ''
                        }
                        
    
                        
                        </IonCol>
                        <IonCol size="2">
                        <div className="btn-group dropend"  color="transparent">
                            <IonButton slot="end" className="btn btn-link dropdown-toggle" type="button"  data-bs-toggle="dropdown" aria-expanded="false" ><IonIcon icon={list}></IonIcon></IonButton>
                            <ul className="dropdown-menu">
                                
                                <li><IonButton className="dropdown-item" routerLink={`/Modifier/${data.data?.annonce_id}`}  >Modifier</IonButton></li>
                                <li><IonButton className="dropdown-item" onClick={getSuprimer}>Suprimer</IonButton></li>
                            </ul>
                        </div>
                        </IonCol>
                    </IonRow>
                    <div className="content">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                    >
                                        <IonIcon icon={carOutline}></IonIcon>{' '}
                                        <h5 style={{ marginLeft: '20%' }}>Voitures</h5>
                                    </button>
                                </h2>
                                <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse "
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        <ul className="list-group list-group-unbordered mb-3">
                                            <li
                                                className="list-group-item"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <b>Matricule</b>
                                                <span style={{ textAlign: 'right' }}>
                                                    {data.data?.detailvoiture.matricule}
                                                </span>
                                            </li>
                                            <li
                                                className="list-group-item"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <b>Kilometrage</b>
                                                <span style={{ textAlign: 'right' }}>
                                                    {data.data?.detailvoiture.kilometrage}
                                                </span>
                                            </li>
                                            <li
                                                className="list-group-item"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <b>Marque :</b>
                                                <span style={{ textAlign: 'right' }}>
                                                    {data.data?.detailvoiture.marque}
                                                </span>
                                            </li>
                                            <li
                                                className="list-group-item"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <b>Categorie :</b>
                                                <span style={{ textAlign: 'right' }}>
                                                    {data.data?.detailvoiture.categorie}
                                                </span>
                                            </li>
                                            <li
                                                className="list-group-item"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <b>Annees de sortie :</b>
                                                <span style={{ textAlign: 'right' }}>
                                                    {data.data?.detailvoiture.annee}
                                                </span>
                                            </li>
                                            <li
                                                className="list-group-item"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <b>Type de carburant :</b>
                                                <span style={{ textAlign: 'right' }}>
                                                    {data.data?.detailvoiture.carburant}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                    >
                                        Basic{' '}
                                        <strong style={{ marginLeft: '20%' }}>
                                        Status : <i>
                                            {data.data?.statut === 1 ?  'En attente' : 
                                            data.data?.statut === 2 ? 'Disponible' : 'Vendu'}
                                        </i>
                                        </strong>
                                    </button>
                                </h2>
                                <div
                                    id="collapseTwo"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        <strong style={{ textDecoration: 'underline' }}>
                                            Description :
                                        </strong>{' '}
                                        {data.data?.description}
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <IonIcon ></IonIcon>
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapse3"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                    >
                                        Proprite
                                    </button>
                                </h2>
                                <div
                                    id="collapse3"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        <ul className="list-group list-group-unbordered mb-3">
                                            {data.data?.proprietes.map((propriete, index) => (
                                                <li
                                                    key={index}
                                                    className="list-group-item"
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <b>{propriete.titre}</b>
                                                    <span style={{ textAlign: 'right' }}>
                                                        {propriete.description}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </IonCardContent>
            </IonCard>
        </IonContent>
    );  
}

export default DetailAnnonceComponent;