'use server';
import { getTokenServer } from "../getTokenServer";

// add ticket
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;


export const addEvent = async(events: any) => {
    const token = await getTokenServer();
    // console.log(token, "event jwt token")
    const res = await fetch(`${baseUrl}/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization : `Bearer ${token}`
        },
        body: JSON.stringify(events),
    });
    
    const data = await res.json();
    return data;
}

// get event by id
export const getEventById = async(id: string) =>{
    const token = await getTokenServer();
    console.log(token);
    const res = await fetch(`${baseUrl}/event/${id}`,{
        headers:{
            authorization : `Bearer ${token}` || ""
        }
    });
    const data = await res.json();

    return data || {};
}

// user add
export const addEventToDashboard = async(eventId:string)=>{
    const token = await getTokenServer();
    const res = await fetch(`${baseUrl}/bookings`,{
        method:"POST",
        headers:{
            "content-type":"application/json",
            authorization : `Bearer ${token || ""}`
        },
        body:JSON.stringify({
            eventId
        })
    });

    return res.json();

};

// get data
export const getMyEvents = async()=>{

 const token = await getTokenServer();


 const res = await fetch(`${baseUrl}/bookings`,{
    headers:{
      authorization:`Bearer ${token || ""}`
    }
 });


 return res.json();

}

export const cancelBooking = async(id:string)=>{

  const token = await getTokenServer();


  const res = await fetch(`${baseUrl}/bookings/${id}`,{
    method:"DELETE",
    headers:{
      authorization:`Bearer ${token || ""}`
    }
  });


  return res.json();

}