import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser } from '../redux/signup/signupSlice';



const ReservationForm = ({selectedProductID, selectedCar}) => {
  const name = localStorage.getItem('name');
  const dispatch = useDispatch();
  const {Products} = useSelector((store) => store.productDetails) || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCar) {
      formData.product_id = selectedProductID;
    }
  const data = {
    endPoints: 'api/reservations',
    method: {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('authToken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reservation: formData }),
    },
  };
  dispatch(signupUser(data));
};

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

  const [formData, setFormData] = useState({
    date: '',
    city: '',
    product_id: '',
  });

  const locations = [
    { id: 1, name: 'India' },
    { id: 2, name: 'USA' },
    { id: 3, name: 'Nigeria' },
    { id: 4, name: 'World' },
  ];

  return (
    <div>
      <h3>Create New Reservation</h3>
      <form onSubmit={handleSubmit} >
      <input type="text"
        value={name}
        disabled
      />
      <div>
        {!selectedCar && (
          <div>
            <select value={formData.product_id}
              onChange={handleChange}
              name="product_id"
            >
              <option value="">Select a Car</option>
              {Products.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <select value={formData.city}
            onChange={handleChange}
            name="city"
          >
            <option value="">Select a location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <input type="date"
        value={formData.date}
        onChange={handleChange}
        name="date"
      />
      <button type="submit">
        Create Reservation
      </button>
    </form>
    </div>
  );
};

export default ReservationForm;
