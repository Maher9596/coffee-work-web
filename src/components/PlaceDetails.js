import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {shopsList} from '../utils/Data'

function PlaceDetails() {
    const {placeDetails} = useParams()
    const [wifi, setWifi] = useState("")
    const [charger, setCharger] = useState("")
    const [convinience, setConvinience] = useState("")
    const [people, setPeople] = useState("")
    const [fetchedData, setFetchedData] = useState([])
    const [name, setName] = useState("")
    const url = "https://nodejs-coffeework.herokuapp.com/"

    // MY LOCAL DATA FOR THE SPECIFIC ROUTE
    const places = shopsList.find(place => place.id.toString() === placeDetails)

    const handleSubmit = (e) => {
        e.preventDefault()
        setData()
    }

    // POSTING DATA TO THE DATABASE
    const setData = async () => {
        axios.post(url, {
            wifi: wifi,
            charger: charger,
            people: people,
            convinience: convinience,
            name: name
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }
 
    useEffect(()  =>  {
        setName(places.name)
        getData()     
     },[])

    // FETCHING DATA FROM THE DATABASE. IT WILL RUN ONE TIME ONLY
    const getData = () => {
        axios.get(url)
        .then((response) => {
            const info = response.data
            setFetchedData(info)
        })
    }
     
        return (
            <div>   
                 <div className='details-top'>               
                    <h1>{places.name}</h1>
                    <img src={places.img} alt="" height="200px"/>
                 </div>
                {fetchedData.map((review) => {
                    return (
                        <div className='reviews'>
                            {review.name === places.name ?
                            <div className='reviewsOk'>
                            <p><span>New Review</span></p>    
                            <p key={places.id}>WIFI Availability: {review.wifi}</p>
                            <p key={places.id}>Charger Socket Availability: {review.charger}</p>
                            <p key={places.id}>Crowd Percentage: {review.people}</p>
                            <p key={places.id}>Recommend to people: {review.wifi}</p>
                            <p>Create On: 1/1/2021</p>
                            </div>
                             :
                            <h1 key={places.id} style={{display:"none"}}>No Reviews...</h1>} 
                        </div>
                    )                                 
                })}
                {/* FORM-------------------------------------------------------------- */}
                <div className='details'>                  
                <form onSubmit={handleSubmit}>
                    <p className='form-title'>Is {places.name} a good place to work at ?</p>  
                    <p>WIFI Availability ?</p>
                    <label>Yes</label>
                    <input required type="radio" name='wifi' value="Yes" onChange={(e) => setWifi(e.target.value)} />
                    <br /> 
                    <label>No</label>
                    <input required type="radio" name='wifi' value="No" onChange={(e) => setWifi(e.target.value)} />                  
                    <br />
                    <p>Charging Socket Availability ?</p>
                    <label>Yes</label>
                    <input required type="radio" name="charger" value="Yes" onChange={(e) => setCharger(e.target.value)} />
                    <br /> 
                    <label>No</label>
                    <input type="radio" name="charger" value="No" onChange={(e) => setCharger(e.target.value)} />                   
                    <br />
                    <p>How crowded is the place ?</p>
                    <label>Not Crowded</label>
                    <input required type="radio" name="people" value="Not Crowded" onChange={(e) => setPeople(e.target.value)} />
                    <br /> 
                    <label>Mildly Crowded</label>
                    <input required type="radio" name="people" value="Mildly Crowded" onChange={(e) => setPeople(e.target.value)} />
                    <br />
                    <label>Crowded</label>
                    <input type="radio" name="people" value="Crowded" onChange={(e) => setPeople(e.target.value)} />
                    <br />
                    <p>Is the place convinient to work at ?</p>
                    <label>Recommend</label>
                    <input required type="radio" name="convinience" value="Recommend" onChange={(e) => setConvinience(e.target.value)} />
                    <br />
                    <label>Don't Recommend</label>
                    <input required type="radio" name="convinience" value="Don't Recommend" onChange={(e) => setConvinience(e.target.value)} />
                    <br /> 
                    <button>Submit</button>                
                </form>
                </div>
            </div>
        );
}

export default PlaceDetails;