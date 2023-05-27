import express, { json } from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express, json());

app.listen(port, () => {
    console.log("server is starting on port:",port)
})

