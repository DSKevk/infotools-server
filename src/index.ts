import 'reflect-metadata';
import { createConnection } from 'typeorm';

import * as express from 'express';
import { Request, Response } from 'express';

import { clientAttributes, commercialAttributes } from './sql-attributes';

import { format } from 'date-fns';
import { mapToCommande } from './mapping/commandes';

createConnection().then(async (connection) => {

    // #region SAMPLE CODE
    /* console.log("Inserting a new user into the database...");

    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;

    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    const userRepository = connection.getRepository(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework."); */
    // #endregion

    const app = express();
    const port = 4201;

    // #region Sample Repo
    /* const clientRepo = connection.getRepository(Client);
    const productRepo = connection.getRepository(Product);
    const commercialRepo = connection.getRepository(Commercial);
    const rdvRepo = connection.getRepository(RendezVous); */
    // #endregion

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });

    /* app.get('/api/:version', (req, res) => {
        res.send(req.params.version);
    }); */

    // #region Produit
    app.get('/product/all', async (req: Request, res: Response) => {
        const produits = await connection.query('SELECT * FROM produit');
        res.send(produits);
    });
    // #endregion

    // #region Commercial
    app.get('/commercial/all', async (req: Request, res: Response) => {
        const commercials = await connection.query('SELECT * FROM commercial');
        res.send(commercials);
    });

    app.get('/commercial/id=:id', async (req: Request, res: Response) => {
        const idCommercial = req.params.id;
        const commercial = await connection.query(`SELECT * FROM commercial WHERE id = ${idCommercial}`);

        res.send(commercial);
    });
    // #endregion

    // #region RDV
    app.get('/rdv/id_commercial=:id', async (req: Request, res: Response) => {
        const commercialID = req.params.id;

        const query = `
            SELECT R.id AS id_rdv, R.date, ${clientAttributes}
            FROM rendezvous R INNER JOIN client CLI ON R.id_client = CLI.id
            WHERE R.id_commercial = ${commercialID}
            AND DATE(R.date) > DATE(NOW());
        `;
        const rdvs = await connection.query(query);

        res.send(rdvs);
    });

    app.get('/rdv/post/date=:date&id_client=:idClient&id_commercial=:idCom', async (req: Request, res: Response) => {
        const newRdv = {
            clientID: req.params.idClient,
            commercialID: req.params.idCom,
            date: format(new Date(req.params.date), 'YYYY-MM-DD HH:mm:ss'),
        };

        const query = `INSERT INTO rendezvous (date, id_client, id_commercial)
            VALUES ("${newRdv.date}", ${newRdv.clientID}, ${newRdv.commercialID});
        `;
        const result = await connection.query(query);

        res.send(result);
    });

    app.get('/rdv/update/id=:id&new_date=:date', async (req: Request, res: Response) => {
        const rdvID = req.params.id;
        const updatedDate = format(new Date(req.params.date), 'YYYY-MM-DD HH:mm:ss');

        const query = `UPDATE rendezvous SET date = "${updatedDate}" WHERE id = ${rdvID}`;
        const result = await connection.query(query);

        res.send(result);
    });

    app.get('/rdv/delete/id=:id', async (req: Request, res: Response) => {
        const rdvID = req.params.id;
        const query = `DELETE FROM rendezvous WHERE id = ${rdvID}`;
        const result = await connection.query(query);

        res.send(result);
    });
    // #endregion

    // #region Commande par client & all client
    app.get('/commande/id_client=:id', async (req: Request, res: Response) => {
        const clientID = req.params.id;

        const query = `
            SELECT C.id, C.date, C.quantite, C.id_client, C.id_produit, C.quantite, P.libelle, P.prix, P.poids
            FROM commande C INNER JOIN produit P ON C.id_produit = P.id
            WHERE C.id_client = ${clientID};`;
        const result = await connection.query(query);
        const commandes = mapToCommande(result);

        res.send(commandes);
    });

    app.get('/client/all', async (req: Request, res: Response) => {
        const clients = await connection.query(`SELECT * FROM client`);
        res.send(clients);
    });
    // #endregion

}).catch((error) => console.log(error));
