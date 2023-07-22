const eventQuery=require('../mysql')


async function getEvent(event){
    const events =await eventQuery.client.executeAsync(event)
    return events
}
async function eventWithData (event,data){
    const newEvent =await eventQuery.client.executeDataWithAsync(event,data)
    return newEvent
}

exports.eventData={
    // Get Event
    async event(req,res){
    
        try {
            let eventList = await getEvent('SELECT * FROM event')  
            res.send(eventList)
        } catch (error) {
            res.send({massage:'Invalid'})
        }finally{
            console.log('Hello world')
        }
    },
    // Create event with user
    async  addEvent(req,res){
        if(typeof req.cookies["user"] != 'undefined'){
            let newEvent={
                event_name:req.body.event_name,
                date:req.body.date
            }
            eventWithData ('INSERT INTO event SET ?',newEvent)
            .then(u=>res.send({massage:'New Event added.'})).catch(err=>{
                console.log(err)
                res.send({massage:'Invalid'})
            })
        }else{
            res.send("Invalid User")
        }
        
    },
    //Get event wirh id
    async  eventWithId(req,res){
        // try {
        //     let userData = await getUser(`SELECT * FROM user WHERE id=${req.params.id}`)  
        //     res.send(userData)
        // } catch (error) {
        //     res.send({massage:'Invalid'})
        // }
        await getEvent(`SELECT * FROM event WHERE event_id=${req.params.id}`)
        .then(u=>res.send(u)).catch(err=>{
            console.log(err)
            res.send({massage:'Invalid'})
        })
    },
    // Update event
    async  updateEvent(req,res){
        let newEvent={
            event_name:req.body.event_name,
            date:req.body.date
        }
        eventWithData (`UPDATE event SET ? WHERE event_id=${req.params.id}`,newEvent)
        .then(u=>res.send({massage:'Event Updated Successfully.'})).catch(err=>{
            console.log(err)
            res.send({massage:'Invalid'})
        })
        
    
    },
    //Delete event
    async deleteEvent(req,res){
        
        getEvent (`DELETE FROM event  WHERE event_id= ${req.params.id}`)
        .then(u=>res.send({massage:'Event Deleted Successfully.'})).catch(err=>{
            console.log(err)
            res.send({massage:'Invalid'})
        })
        
    
    }
}

