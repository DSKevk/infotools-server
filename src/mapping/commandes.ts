// tslint:disable:interface-name

interface Commande {
    id: number;
    date: Date;
    clientID: number;
    produits: Produit[];
}

interface Produit {
    id: number;
    libelle: string;
    prix: number;
    quantite: number;
}

export function mapToCommande(result) {
    let currentLineID;
    const commandes = new Array<Commande>();

    result.forEach((line) => {
        currentLineID = line.id;
        let existingCommande = commandes.find((commande) => commande.id === currentLineID);

        if (!existingCommande) {
            existingCommande = createNewCommande(line);
            commandes.push(existingCommande);
        }
        console.log(existingCommande);
        const newProduit = createNewProduit(line);
        existingCommande.produits.push(newProduit);
    });

    return commandes;
}

function createNewCommande(line): Commande {
    return {
        id: line.id,
        // tslint:disable-next-line:object-literal-sort-keys
        date: line.date,
        clientID: line.id_client,
        produits: [],
    };
}

export function createNewProduit(line): Produit {
    return {
        id: line.id_produit,
        libelle: line.libelle,
        prix: line.prix,
        quantite: line.quantite,
    };
}
