import 'reflect-metadata';
import { createConnection } from 'typeorm';

import * as express from 'express';
import { Request, Response } from 'express';

import { Client, Commercial, Product, RendezVous, User } from './entity';

createConnection().then(async (connection) => {

    //#region SAMPLE CODE
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
    //#endregion

    const app = express();
    const port = 4201;

   /*  const clientRepo = connection.getRepository(Client);
    const productRepo = connection.getRepository(Product);
    const commercialRepo = connection.getRepository(Commercial);
    const rdvRepo = connection.getRepository(RendezVous); */

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });

    app.get('user', (req: Request, res: Response) => {
        res.send('test');
    });

}).catch((error) => console.log(error));
