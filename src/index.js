const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cors = require('cors')

app.use(cors())

const port = 3000

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://aivan:FUhDA8mciA3e7VjH@cluster0.rirv94f.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverApi: ServerApiVersion.v1 
});

async function main() {
    try {
        await client.connect();
    
    } catch (e) {
        console.error(e);
    }
}

const getAllDocumentsByCollection = async (collection) => {
    return await client.db("MisCuentasApp").collection(collection).find();
}

const setDocumentByCollection = async (collection, data) => {
    return await client.db("MisCuentasApp").collection(collection).insertOne(data);
}


app.get('/getProducts', async (req, res) => {
    try{
        const products = await getAllDocumentsByCollection('products')
        const result = await products.toArray()
        res.json(result);
    }catch(e){
        res.send(e)
    }
})

app.get('/getAllBrands', async (req, res) => {
    try{
        const brands = await getAllDocumentsByCollection('brands')
        const result = await brands.toArray()
        res.json(result);
    }catch(e){
        res.send(e)
    }
})

app.post('/setBrand', async (req, res) => {
    try{
        const result = await setDocumentByCollection('brands', req.body)
        res.json(result);
    }catch(e){
        console.log(e)
        res.send(e)
    }
})

app.post('/setBussines', async (req, res) => {
    try{
        const result = await setDocumentByCollection('bussines', req.body)
        res.json(result);
    }catch(e){
        console.log(e)
        res.send(e)
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

main()