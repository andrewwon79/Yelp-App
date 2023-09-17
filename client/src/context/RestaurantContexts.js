import React, {useState, createContext} from "react";

export const RestaurantsContext = createContext();
    
export const RestaurantsContextProvider = props => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const addRestaurants = (newRestaurant) => {
        setRestaurants([...restaurants,newRestaurant]);
    }

//explanation for this context
//const [restaurants, setRestaurants] = useState([])
//useState just holds information about the current state of an object, restaurants is our holder, setRestaurants UPDATES IT
//if we wanted a default initial value we would do this
//const [restaurants, setRestaurants] = useState(["mcdonalds", "wendys," ...])
//our restaurants would have 2 things in it
//anytime we call setRestaurants, anywhere that is using restaurants it is updated
//we combine this with context because context allows us to have this information available in all the deep children
//The value={{restaurants: restaurants
//In first restaurants we are setting the value, so if we change (restaurants: restaurants) -> (restaurantz: restaurants) then in restaurantList all instances of restaurants would Z
    return (
        <RestaurantsContext.Provider value={{restaurants: restaurants,setRestaurants: setRestaurants, addRestaurants: addRestaurants,selectedRestaurant,setSelectedRestaurant}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}