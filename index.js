const express = require("express")
const cors = require("cors")
const port = process.env.PORT || "5000";
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const servicesCollection = client.db("psychologist").collection("services")
        const reveiwCollection = client.db("psychologist").collection("reveiw")
        app.get("/services", async (req, res) => {
            const query = {}
            const cursor = servicesCollection.find(query)
            const services = await cursor.toArray()
            res.send(services)
        })

        app.get("/service/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await servicesCollection.findOne(query)
            res.send(result)
        })

        app.get("/service", async (req, res) => {
            const query = {}
            const cursor = servicesCollection.find(query)
            const services = await cursor.limit(3).toArray()
            res.send(services)
        })

        app.get('/reveiw/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const cursor = reveiwCollection.find(query)
            const reveiw = await cursor.toArray()
            res.send(reveiw)
        })

        app.post('/addservice', async (req, res) => {
            const service = req.body
            const result = await servicesCollection.insertOne(service)
            res.send(result)
        })

        app.post("/reveiw", async (req, res) => {
            const reveiw = req.body;
            const result = await reveiwCollection.insertOne(reveiw)
            res.send(result)
        })

    }

    finally {

    }

}


run().catch((err) => console.log(err))


app.listen(port, () => {
    console.log(`server working ${port}`)
})