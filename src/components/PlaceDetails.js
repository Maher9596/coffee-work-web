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
    const [submit, setSubmit] = useState("Submit")
    const [isReview, setIsReview] = useState(false)
    const url = "https://nodejs-coffeework.herokuapp.com/"

    // MY LOCAL DATA FOR THE SPECIFIC ROUTE
    const places = shopsList.find(place => place.id.toString() === placeDetails)

    const handleSubmit = (e) => {
        e.preventDefault()
        setData()
    }

    // POSTING DATA TO THE DATABASE
    const setData = async () => {
        try {
            setIsReview(false)
            let postedMessage = await axios.post(url, {
                wifi: wifi,
                charger: charger,
                people: people,
                convinience: convinience,
                name: name
            })
            console.log(postedMessage)
        } catch (error) {
            console.log(error.message)
        }

    }
 
    useEffect(()  =>  {
        setName(places.name)
        getData()  
     },[submit])

    // FETCHING DATA FROM THE DATABASE. IT WILL RUN ONE TIME ONLY
    const getData = async () => {
        try {
            const response = await  axios.get(url)
            const info = await response.data
            setFetchedData(info)
        } catch (error) {
            console.log(error.message)
        }

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
                            <div  key={places.id} className='reviewsOk'>
                            <p><span>New Review</span></p>    
                            <p><span>WIFI Availability:</span> {review.wifi}</p>
                            <p><span>Charger Socket Availability:</span> {review.charger}</p>
                            <p><span>How Crowded:</span> {review.people}</p>
                            <p><span>Recommend to people:</span> {review.convinience}</p>
                            <p><span>Create On:</span> 1/1/2021</p>
                            </div>
                             :
                            <h1 key={places.id} style={{display:"none"}}>No Reviews...</h1>} 
                        </div>
                    )                                 
                })}
                {/* FORM-------------------------------------------------------------- */}
                <div className='details'>
                {!isReview ?   <p className='addReview' onClick={() => setIsReview(true)}>Add a review...</p> :                 
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
                    <label>I Recommend</label>
                    <input required type="radio" name="convinience" value="I Recommend" onChange={(e) => setConvinience(e.target.value)} />
                    <br />
                    <label>I Don't Recommend</label>
                    <input required type="radio" name="convinience" value="I Don't Recommend" onChange={(e) => setConvinience(e.target.value)} />
                    <br /> 
                    <button>{submit}</button>                
                </form>
}
                </div>
            </div>
        );
}

export default PlaceDetails;