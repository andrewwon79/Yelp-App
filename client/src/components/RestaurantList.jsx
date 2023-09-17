import React, {useContext, useEffect} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContexts';
import { useNavigate } from "react-router-dom";
import StarRating from './StarRating';
export const RestaurantList = () => {
    /**this restaurants and setRestaurants needs to match what we originally set in the context */
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    let navigate = useNavigate()

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants)
                console.log(response.data.data);
                //in the parentheses it'll jam the baseURL from RestaurantFinder and append this extra "/"
            }catch (err) {
    
            }
        }   
        fetchData();
        //this use of fetchData will fix the useEffect must not return anything besides a function
        //useEffect complains if it returns something, but now we are calling fetchdData which returns something and this is ok
    },[]);
    //this ,[] here will only run when we mount the component
    //not having it here will have it run in a loop every time we render component

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try{
            const response = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(restaurant => restaurant.id !== id))
        }catch(err) {
            console.log(err);
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation()
        navigate(`/restaurants/${id}/update`);
    }

    const renderRating = (restaurant) => {

        if(!restaurant.count) {
            return <span className='text-warning'>0 reviews</span>
        }

        return (
        <>
            <StarRating rating={restaurant.average_rating}/>
            <span className="text warning ml-1">({restaurant.count})</span>
        </>   
        ); 
    }

    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`)
    }

  return (
    <div className='list-group'>
        <table className="table table-dark table-hover">
            <thead>
                <tr className="table-primary">
                    <th scrope="col">Restaurant</th>
                    <th scrope="col">Location</th>
                    <th scrope="col">Price Range</th>
                    <th scrope="col">Ratings</th>
                    <th scrope="col">Edit</th>
                    <th scrope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {/* map just iterates through our restaurants array, thats all */}
                {/** the restaurants && is just logic incase our restaurants list does not load in time, we will ONLY load if restuarants is not null */}
                {/** if we do not include a key in our .map, we will have to re-render the ENTIRE list of restaurants, thats why its recommended to have a key so it only updates 1 */}
                {restaurants && restaurants.map(restaurant => {
                    return (
                    <tr 
                    onClick={() => handleRestaurantSelect(restaurant.id)} 
                    key={restaurant.id}
                    >
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>{renderRating(restaurant)}</td>
                        <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button></td>
                        <td><button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                        {/** if you don't put this () => next to onClick, it'll think you want to run this delete immediately, but we want to only run when its clicked */}
                    </tr>
                    )
                })}

                {/*
                <tr>
                    <td>mcdonalds</td>
                    <td>New York</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr>
                <tr>
                    <td>mcdonalds</td>
                    <td>New York</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr>
                */}
            </tbody>
        </table>
    </div>
  )
}
