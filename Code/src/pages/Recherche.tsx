import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonRange, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { Carburant, Categorie, Lieu, Marque } from "../data/DetailVoitureModel";
import { add, remove } from "ionicons/icons";
import 'ion-rangeslider/css/ion.rangeSlider.min.css';
import 'ion-rangeslider/js/ion.rangeSlider.min.js';
import * as $ from 'jquery';  // Importez jQuery
import AnnonceC from "../components/AnnonceComponent";


const Recherche: React.FC = () => {
    const name = "Recherche";
    const [searchText, setSearchText] = useState<string>('');
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    const [isReponse , setIsReponse] = useState<boolean>(false);

    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);
    const page = useRef(null);

    // format data

    //get data
    const [marque , setMarque] = useState<string>();
    const [categorie , setCategorie] = useState<string>();
    const [prix_vente , setPrix_vente] = useState({min: 0, max: 0});
    const [kilometrage , setKilometrage] = useState({min: 0, max: 0});
    const [date , setDate] = useState({debut: '' , fin: ''});
    const [carburant , setCarburant] = useState<string>('');
    const [autre , setAutre] = useState<string>('');
    const [lieu , setlieu] = useState<string>('');
    const [annee, setAnnee] = useState({min: 0 , max: 0});
    const [annonces , setAnnonces] = useState([]);

    const construireData = () => {
        const data: { [key: string]: any } = {};

        if (marque !== undefined && marque !== null) {
            data["marque"] = marque;
        }

        if (categorie !== undefined && categorie !== null) {
            data["categorie"] = categorie;
        }

        if (prix_vente.min !== 0 || prix_vente.max !== 0) {
            data["prix_vente"] = prix_vente;
        }

        if (kilometrage.min !== 0 || kilometrage.max !== 0) {
            data["kilometrage"] = kilometrage;
        }

        if (date.debut !== '' || date.fin !== '') {
            data["date"] = date;
        }

        if (carburant !== '') {
            data["carburant"] = carburant;
        }

        if (autre !== '') {
            data["autre"] = autre;
        }

        if (lieu !== '') {
            data["lieu"] = lieu;
        }

        if (annee.min !== 0 || annee.max !== 0) {
            data["annee"] = annee;
        }

        return data;
    }
    
    

    //data
    const[marques , setMarques] = useState<Marque[]>();
    const[categories ,setCategories] = useState<Categorie[]>();
    const[carburants , setCarburants] = useState<Carburant[]>();
    const[lieux , setLieux] = useState<Lieu[]>();
    const rangeSliderRef = useRef<any>(null);


    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setPresentingElement(page.current);
    }, []);

    function dismiss() {
        modal.current?.dismiss();
    }

    async function canDismiss(data?: any, role?: string) {
        return role !== 'gesture';
    }


    const handleSearchTextChange = (e: CustomEvent) => {
        setSearchText(e.detail.value);
    };

    const handleSearchBarClick = () => {
        setIsSearchActive(!isSearchActive);
    };

    function confirmation() {
        modal.current?.dismiss(input.current?.value, "confirm");
      }

    const recherche = async () => {
        console.log(construireData());
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('https://wscloudfinal-production.up.railway.app/api/v1/annonces/filtre', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(construireData())
            });
            const responsetoken = await response.json();
            if (response.ok) {
                const token = await responsetoken.data;
                console.log(responsetoken.data);
                confirmation();

            } 
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    useEffect(() => {
        const fetchMarque = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch('https://wscloudfinal-production.up.railway.app/api/v1/marques', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    const responseData = await response.json();
                   
                    setMarques(responseData.data);
                    // console.log(marques);
                } else {
                    console.error('Error fetching annonces:', response.status);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };
    
        const fetchCategorie = async () => {
          try {
              const token = sessionStorage.getItem('token');
              const response = await fetch('https://wscloudfinal-production.up.railway.app/api/v1/categories', {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                  },
              });
    
              if (response.ok) {
                  const responseData = await response.json();
                 
                  setCategories(responseData.data);
                  // console.log(categories);
              } else {
                  console.error('Error fetching annonces:', response.status);
              }
          } catch (error) {
              console.error('Error during fetch:', error);
          }
      };
    
    
      const fetchCarburant = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('https://wscloudfinal-production.up.railway.app/api/v1/models/v1/carburants', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const responseData = await response.json();
               
                setCarburants(responseData.data);
                // console.log(categories);
            } else {
                console.error('Error fetching annonces:', response.status);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
      };

      const fetchLieu = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('https://wscloudfinal-production.up.railway.app/api/lieux', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const responseData = await response.json();
               
                // setCarburants(responseData.data);
                setLieux(responseData.data);
                // console.log(categories);
            } else {
                console.error('Error fetching annonces:', response.status);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
      };
        
        fetchCategorie();
        fetchMarque();
        fetchCarburant();
        fetchLieu();
    }, []);

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonSearchbar value={searchText} onIonChange={handleSearchTextChange} onClick={handleSearchBarClick}></IonSearchbar>
            {isSearchActive && (
                <><IonButton id="open-modal" expand="full" onClick={() => console.log('Recherche avancée')}>
                        Recherche avancée
                    </IonButton><IonModal ref={modal} trigger="open-modal" canDismiss={canDismiss} presentingElement={presentingElement!}>
                            <IonHeader>
                                <IonToolbar>
                                    <IonTitle>Recherche avancer</IonTitle>
                                    <IonButtons slot="end">
                                        <IonButton onClick={() => dismiss()}>Close</IonButton>
                                    </IonButtons>
                                </IonToolbar>
                            </IonHeader>
                            <IonContent className="ion-padding">
                                <IonRow>
                                    <IonLabel position="stacked">Sélectionnez votre prix :</IonLabel>
                                    <br />
                                    <IonCol size="6">
                                        <IonInput 
                                        label="Min" 
                                        type='number' 
                                        labelPlacement="floating" 
                                        fill="outline" 
                                        value={prix_vente.min ?? ''}
                                        onIonChange={(e) => setPrix_vente({ ...prix_vente, min:parseFloat(e.detail.value!)})}
                                        style={{ width: '100%' , heigth: '50%' }} />
                                        
                                    </IonCol>

                                    <IonCol size="6">
                                        <IonInput 
                                        label="Max" 
                                        type='number' 
                                        labelPlacement="floating" 
                                        fill="outline" 
                                        value={prix_vente.max ?? ''}
                                        onIonChange={(e) => setPrix_vente({ ...prix_vente, max: parseFloat(e.detail.value!) })}
                                        style={{ width: '100%', height: '50%' }} />
                                    </IonCol>
                                </IonRow>
                                {/* <br />  */}
                                <IonRow>
                                    <br />
                                    <IonLabel position="stacked"> Entree votre Date limite :</IonLabel>
                                   
                                    <IonCol size="6">
                                        <IonInput 
                                        label="debut"
                                        type="date" 
                                        labelPlacement="floating" 
                                        fill="outline" 
                                        value={date.debut} 
                                        onIonChange={(e) =>setDate({...date, debut: e.detail.value! }) }>

                                        </IonInput>
                                    </IonCol>
                                    <IonCol size="6">
                                        <IonInput 
                                        label="fin"
                                        type="date" 
                                        labelPlacement="floating" 
                                        fill="outline" 
                                        value={date.fin} 
                                        onIonChange={(e) =>setDate({...date , fin: e.detail.value! }) }>
                                        </IonInput>
                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <br />
                                    <IonLabel position="stacked">Sélectionnez votre Kilometage limite :</IonLabel>
                                   
                                    <IonCol size="6">
                                        <IonInput 
                                        label="Min" 
                                        type='number' 
                                        labelPlacement="floating" 
                                        fill="outline" 
                                        value={kilometrage.min}
                                        onIonChange={(e) => setKilometrage({ ...kilometrage ,min: parseFloat(e.detail.value!)})}
                                        style={{ width: '100%' }} />
                                    </IonCol>
                                    <IonCol size="6">
                                        <IonInput 
                                        label="Max" 
                                        type='number' 
                                        labelPlacement="floating" 
                                        fill="outline" 
                                        value={kilometrage.max}
                                        onIonChange={(e) => setKilometrage({ ...kilometrage ,max: parseFloat(e.detail.value!)})}
                                        style={{ width: '100%' }} />
                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <br />
                                    <IonLabel position="stacked">Sélectionnez votre annees :</IonLabel>
                                   
                                    <IonCol size="6">
                                        <IonInput 
                                        label="Min" 
                                        type='number' 
                                        labelPlacement="floating" 
                                        fill="outline" 
                                        value={annee.min}
                                        onIonChange={(e) => setAnnee({ ...annee ,min: parseFloat(e.detail.value!)})}
                                        style={{ width: '100%' }} />
                                    </IonCol>
                                    <IonCol size="6">
                                        <IonInput 
                                        label="Max" 
                                        type='number' 
                                        labelPlacement="floating" 
                                        fill="outline" 
                                        value={annee.max}
                                        onIonChange={(e) => setAnnee({ ...annee ,max: parseFloat(e.detail.value!)})}
                                        style={{ width: '100%' }} />
                                    </IonCol>
                                </IonRow>

                                <IonLabel position="stacked">Choisir :</IonLabel>
                                <IonRow>
                                    <IonCol size="6">
                                        <IonSelect
                                            interface="popover"
                                            toggleIcon={add}
                                            expandedIcon={remove}
                                            aria-label="Marque" 
                                            value={marque}
                                            onIonChange={(e) => setMarque(e.detail.value)}
                                            placeholder="Marque" 
                                            >
                                            {marques?.map((m) => (
                                                <IonSelectOption key={m.id_marque} value="{m.id_marque}">{m.marque}</IonSelectOption>
                                            ))}
                                            
                                        </IonSelect>
                                    </IonCol>
                                   <IonCol size="6">
                                    <IonSelect
                                            interface="popover"
                                            toggleIcon={add}
                                            expandedIcon={remove}
                                            aria-label="Categorie" 
                                            value={categorie}
                                            onIonChange={(e) => setCategorie(e.detail.value)}
                                            placeholder="Categorie" 
                                            >
                                            {categories?.map((c) => (
                                                <IonSelectOption key={c.idCategorie} value="{c.idCategorie}">{c.categorie}</IonSelectOption>
                                            ))}
                                        </IonSelect>
                                   </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol size="6">
                                        <IonSelect
                                        interface="popover"
                                        toggleIcon={add}
                                        expandedIcon={remove}
                                        aria-label="Carburant" 
                                        value={carburant}
                                        onIonChange={(e) => setCarburant(e.detail.value)}
                                        placeholder="Carburant" 
                                        >
                                            {carburants?.map((c) => (
                                                <IonSelectOption key={c.carburant} value={c.carburant}>{c.carburant}</IonSelectOption>
                                            ))}
                                        </IonSelect>
                                    </IonCol>
                                    <IonCol size="6">
                                        <IonSelect
                                        interface="popover"
                                        toggleIcon={add}
                                        expandedIcon={remove}
                                        aria-label="Lieu" 
                                        value={lieu}
                                        onIonChange={(e) => setlieu(e.detail.value)}
                                        placeholder="Lieu" 
                                        >
                                            {lieux?.map((l) => (
                                                <IonSelectOption key={l.lieu} value={l.lieu}>{l.lieu}</IonSelectOption>
                                            ))}
                                        </IonSelect>
                                    </IonCol>
                                </IonRow>

                                <IonItem>
                                    <IonLabel>Matricule/ Detail annonce / propriete</IonLabel>
                                    <IonInput
                                    label="Text" 
                                    type='text' 
                                    labelPlacement="floating" 
                                    fill="outline" 
                                    value={autre}
                                    onIonChange={(e) => setAutre(e.detail.value!)} />
                                </IonItem>
                                <IonButton
                                style={{width:'100%'}}
                                color={"success"}
                                onClick={recherche}
                                >Valider</IonButton>          
                            </IonContent>
                        </IonModal></>
            )}
            {isReponse && (
                <>
                <AnnonceC data={annonces} />
                </>
            )}
            </IonContent>
        </IonPage>
    );
}

export default Recherche;