import React from 'react'
import { Header } from '../components/Header'
import { AddRestaurant } from '../components/AddRestaurant'
import { RestaurantList } from '../components/RestaurantList';

export const Home = () => {
  return (
    <div>
        <Header/>
        <AddRestaurant/>
        <RestaurantList/>
    </div>
  );
};
