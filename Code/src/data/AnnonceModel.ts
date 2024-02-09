interface Photo {
    data: string;
    contentType: string;
}

interface Propriete {
    titre: string;
    description: string;
}

interface DetailVoiture {
    matricule: string;
    kilometrage: number;
    marque: string;
    categorie: string;
    annee:number;
    carburant:string;
}

export interface AnnonceModel {
    id: string;
    annonce_id: string;
    auteur_id: string;
    acteur:string;
    lieu: string | null;
    statut:number;
    prix_vente: number;
    date_annonce: string;
    detailvoiture: DetailVoiture;
    description: string;
    proprietes: Propriete[];
    photos: Photo[];
}
/// INSERTION DANS LA BASE

interface InfoAnnonce {
    description: string;
    proprietes: Propriete[];
    photo: Photo[];
}

interface Voiture {
    idVoiture: number;
    modelId:number;
    matricule: string;
    utilisateurId: number;
    kilometrage: number;
    modelcarburantId:number;
    anneesortieId:number;
}

export interface AnnonceInsertion {
    lieuId: number | 2;
    prixVente: number;
    statut: number | 1;
    dateAnnonce: Date;
    dateConfirmation: string | null;
    voiture: Voiture;
    infoAnnonce: InfoAnnonce;
}

export interface AnnonceFind {
    
}

