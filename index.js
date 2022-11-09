const express = require("express")
const cors = require("cors")
const port = process.env.PORT || "5000";
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()

// middleware 
app.use(cors())
app.use(express.json())




app.get('/', (req, res) => {
    res.send("psychologist service server working")
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2sdc0k9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        app.get("/services", async (req, res) => {
            const servicesCollection = client.db("psychologist").collection("services")
            const query = {}
            const cursor = servicesCollection.find(query)
            const services = await cursor.toArray()
            res.send(services)

        })


    }

    finally {

    }

}


run().catch((err) => console.log(err))


app.listen(port, () => {
    console.log(`server working ${port}`)
})