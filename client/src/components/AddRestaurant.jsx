import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContexts';

export const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext);
    const [name,setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await RestaurantFinder.post("/",{
                /** the name,location, and price_range is what our backend expects data to be coming in, if we want to send in 4, its going to be price_range=4 */
                /** javascript short hand is that, if what state we're passing in matches what  */
                name,
                location,
                price_range: priceRange
            });
            addRestaurants(response.data.data.restaurant);
            console.log(response);
        }catch(err){

        }
    }

  return (
    <div className='mb-4'>
        <form action="">
                <div className='row'>
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="name"/>
                    </div>
                    <div className="col">
                        <input value={location} onChange={e => setLocation(e.target.value)} className="form-control" type="text" placeholder="location"/>
                    </div>
                    <div className="col">
                        <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="form-select">
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <div className='d-grid col-1'>
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
                    </div>
                </div>
        </form>
    </div>
  );
};
