const express = require('express')
const server=express()
server.use(express.json())

let events=[];
server.get('/events',(request,response)=>{
    response.send(events)
})

server.post('/events/add',(request,response)=>{
    const{ename,id,date,venue,organizer}=request.body;
    events.push({
        ename,
        id,
        date,
        venue,
        organizer,
    })
    response.send('Event added')
});

server.get('/event/:id',(request,response)=>{
    const event=events.filter((event)=>event.id==request.params.id)
    if(event.length==0){
        return response.send('Event not found')
    }
    response.send(event)
})

server.put('/event/:id',(request,response)=>{
    const id=request.params.id;
    const {ename,date,venue,organizer}=request.body;
    let updated=false;
    events=events.map((event)=>{
        if(event.id==id){
            updated=true
            return{
                id:event.id,
                ename: ename,
                date: date,
                venue: venue,
                organizer: organizer
            }
        }
        return event
    })

    if(!updated){
        return response.send('Event not found');
    }
    response.send('Event updated successfully')
})

server.delete('/event/:id',(request,response)=>{
    const id=request.params.id
    const ilength=events.length

    events=events.filter((event)=> event.id!=id)
    if(events.length==ilength)
    {
        return response.send('Event not found')
    }
    response.send('Event deleted successfully')
})

let bookings=[]

server.get('/api/bookings',(request,response)=>{
    response.send(bookings)
})


server.post('/api/bookings',(request,response)=>{
    const { name,id,eventName,date,email }=request.body;
    bookings.push({
        name,
        id,
        eventName,
        date,
        email,
    })
    response.send('Booking created successfully')
})

server.get('/api/bookings/:id',(request,response)=>{
    const booking=bookings.filter((booking)=> booking.id==request.params.id)
    if(booking.length==0)
    {
        return response.send('Booking not found')
    }
    response.send(booking)
})


server.put('/api/bookings/:id',(request,response)=>{
    const id=request.params.id
    const { name, eventName, date, email}=request.body
    let updated=false
    bookings=bookings.map((booking)=>{
        if(booking.id==id){
        updated=true
        return{
            id:booking.id,
            name:name,
            eventName:eventName,
            date:date,
            email:email,
        }
    }
    return booking
    })
    if(!updated)
    {
        return response.send('Booking not found')
    }
    response.send('Booking updated successfully')
})

server.delete('/api/bookings/:id',(request,response)=>{
    const id=request.params.id
    const ilength=bookings.length
    bookings=bookings.filter((booking)=>booking.id!=id)
    if(bookings.length == ilength){
        return response.send('Booking not found')
    }
    response.send('Booking cancelled successfully')
})


server.listen(3000,()=>{
    console.log("Synergia Event & Booking API running on port 3000")
})