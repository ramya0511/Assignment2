const { MongoClient, ServerApiVersion} = require('mongodb');
const uri = "mongodb+srv://RamyaPai:ramya123@cluster0.ygf4n.mongodb.net/?appName=Cluster0";
const express=require("express")
const app=express();
app.use(express.json())

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get("/events",async(request,response)=>{
    const database=client.db("Synergia");
    const eventCollection=database.collection("events");
    try{
        const events=await eventCollection.find().toArray();
        return response.send(events);
    }
    catch(error){
        console.log(error);
    }
});


app.post("/events",async(request,response)=>{
    const{ename,id,date,venue,organizer}=request.body;    
    const database=client.db("Synergia");
    const eventCollection=database.collection("events");

    await eventCollection.insertOne({
       ename:ename,
       id:id,
       date:date,
       venue:venue,
       organizer:organizer, 
    })
    .then(()=>{
        console.log("Executed");
        return response.send("Added");
    })
    .catch((error)=>{
        console.log(error);
    });
});

app.get('/event/:id',async (request,response)=>{
    const database=client.db("Synergia");
    const eventCollection=database.collection("events");
    const eventid=request.params.id;
    try{
        const event= await eventCollection.findOne({_id:new ObjectId(eventid)});
        response.send(event);
    }
    catch(error){
        console.log(error);
    }
})


app.put('/event/:id',async(request,response)=>{
    const database=client.db("Synergia");
    const eventCollection=database.collection("events")
    const eventid=Number(request.params.id);

    const{ename,date,venue,organizer}=request.body;
    try{
        const event=await eventCollection.updateOne(
            { id:eventid},
            { $set:{ename,date,venue,organizer}}
        )
        response.send("Event updated successfully")
    }
    catch(error){
        console.log(error)
    }
})

app.delete('/event/:id',async(request,response)=>{
    const database=client.db("Synergia");
    const eventCollection=database.collection("events")
    const eventid=Number(request.params.id);
    try{
        await eventCollection.deleteOne({id:eventid})
        response.send("Event deleted successfully")
    }
    catch(error){
        console.log(error)
    }
})

app.get('/api/bookings',async(request,response)=>{
    const database=client.db("Synergia");
    const bookingCollection=database.collection("bookings")
    try{
        const bookings =await bookingCollection.find().toArray();
        return response.send(bookings);
    }
    catch(error){
        console.log(error);
    }
})

app.post("/api/bookings",async(request,response)=>{
    const{name,id,eventName,date,email}=request.body;    
    const database=client.db("Synergia");
    const bookingCollection=database.collection("bookings");

    await bookingCollection.insertOne({
       name:name,
       id:id,
       eventName:eventName,
       date:date,
       email:email,
    })
    .then(()=>{
        console.log("Executed");
        return response.send("Added");
    })
    .catch((error)=>{
        console.log(error);
    });
});

app.get('/api/bookings/:id',async (request,response)=>{
    const database=client.db("Synergia");
    const bookingCollection=database.collection("bookings");
    const eventid=request.params.id;
    try{
        const booking= await bookingCollection.findOne({id:eventid});
        response.send(booking);
    }
    catch(error){
        console.log(error);
    }
})

app.put('/api/bookings/:id',async(request,response)=>{
    const database=client.db("Synergia");
    const bookingCollection=database.collection("bookings")
    const eventid=Number(request.params.id);

    const{name,eventName,date,email}=request.body;
    try{
        const booking=await bookingCollection.updateOne(
            { id:eventid},
            { $set:{name,eventName,date,email}}
        )
        response.send("Booking updated successfully")
    }
    catch(error){
        console.log(error)
    }
})

app.delete('/api/bookings/:id',async(request,response)=>{
    const database=client.db("Synergia");
    const bookingCollection=database.collection("bookings")
    const eventid=Number(request.params.id);
    try{
        await bookingCollection.deleteOne({id:eventid})
        response.send("Booking deleted successfully")
    }
    catch(error){
        console.log(error)
    }
})

app.listen(3000,(request,response)=>
{
    console.log("Server started")
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}

run().catch(console.dir);