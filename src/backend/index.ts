import express from 'express'
import swaggerUi from 'swagger-ui-express';
import { remultExpress } from 'remult/remult-express'
import { createKnexDataProvider } from 'remult/remult-knex'

export const app = express()

const api = remultExpress({
    dataProvider: createKnexDataProvider({
        client: "sqlite3",
        connection: {
            filename: "./mydb.sqlite"
        }
    }),
    entities: []
});

app.use(api);

const openApiDocument = api.openApiDoc({ title: "remult-react-todo" });
app.get("/api/openApi.json", (req, res) => res.json(openApiDocument));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));