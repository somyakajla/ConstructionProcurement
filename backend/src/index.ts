import express from "express";
import mongoose from "mongoose";

import * as environment from "./environment";

import { RegisterControllers } from "./utils/controller.registration";
import { RegisterErrorMiddleware } from "./utils/errorhandler.registration";
import { RegisterMiddleware } from "./utils/middleware.registration";


const app = express();
const port = 3000; // default port to listen

RegisterMiddleware(app);
RegisterControllers(app);
RegisterErrorMiddleware(app);

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello, world!" );
} );

// start the Express server
app.listen(environment.port, async () => {
    const options: mongoose.ConnectionOptions = {
        useNewUrlParser: true,
    };
    await mongoose.connect(environment.mongoDbUrl, options);
    const collections = await mongoose.connection.db.collections();
    collections.forEach(c => console.log(`Found: ${c.collectionName}`));
    console.log(`server is ready ${environment.baseUrl}:${environment.port}`);
} );