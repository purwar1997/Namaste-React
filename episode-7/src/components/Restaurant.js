import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MENU_URL } from '../utils/constants';
import Shimmer from './Shimmer';
import MenuItem from './MenuItem';

const Restaurant = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const { restaurantId } = useParams();

  useEffect(() => {
    fetchRestaurantMenu();
  }, [restaurantId]);

  const fetchRestaurantMenu = async () => {
    try {
      const response = await fetch(MENU_URL + restaurantId);
      const json = await response.json();

      setRestaurantData(json?.data?.cards[0].card?.card?.info);

      setRestaurantMenu(
        json?.data?.cards?.at(-1)?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
          ?.itemCards
      );

      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  if (loading) {
    return <Shimmer />;
  }

  const {
    name,
    avgRating,
    costForTwoMessage,
    cuisines,
    locality,
    totalRatingsString,
    sla: { slaString },
  } = restaurantData;

  return (
    <div className='restaurant'>
      <div className='restaurant-info'>
        <div className='restaurant-info-header'>
          <div className='restaurant-name-address-wrapper'>
            <h3 className='restaurant-name'>{name}</h3>
            <p className='restaurant-cuisines'>{cuisines.join(', ')}</p>
            <p className='restaurant-address'>{locality}</p>
          </div>

          <div className='restaurant-ratings-wrapper'>
            <h4 className='average-rating'>{avgRating}</h4>
            <p className='total-ratings'>{totalRatingsString}</p>
          </div>
        </div>

        <div className='restaurant-cost-time-wrapper'>
          <span className='delivery-time'>{slaString}</span>
          <span className='cost-for-two'>{costForTwoMessage}</span>
        </div>
      </div>

      <div className='restaurant-menu'>
        <div className='menu-card'>
          {restaurantMenu.map(menuItem => (
            <MenuItem key={menuItem?.card?.info?.id} menuItem={menuItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
