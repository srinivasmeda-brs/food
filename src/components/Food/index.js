// import axios from 'axios';


// export const HttpPost = async(aParams) => {
//   let oResponse = await axios.post(BaseURL, aParams, oHeaders);
//   return oResponse?.data;
// }

// REACT_APP_API_ENDPOINT=https://trackapi.nutritionix.com/v2/natural/nutrients
// REACT_APP_API_ID=e28331cf
// REACT_APP_API_KEY=d578d9ba935d991b939fae6f0969dedf
// REACT_APP_API_USER_ID=manoharv
// PUBLIC_URL=/buildriseshine/api/reactjs/food-nutrition




// import React, { Component } from 'react';
// import axios from 'axios';

// class Food extends Component {
  
//   componentDidMount() {
//     this.getData(); // Fetch data when the component mounts
//   }

//   getData = async () => {
//     const BaseURL = "https://trackapi.nutritionix.com/v2/natural/nutrients";
//     const aParams = { query: "1 cup mashed potato" };
//     const options = {
//       headers: {
//         'x-app-id': "e28331cf",
//         'x-app-key': "d578d9ba935d991b939fae6f0969dedf",
//         'x-remote-user-id': "manoharv"
//       }
//     };

//     try {
//       const response = await axios.post(BaseURL, aParams, options);
//       console.log(response.data); // Log the fetched data
//     } catch (error) {
//       console.error('Error fetching data:', error.response ? error.response.data : error.message);
//     }
//   };

//   render() {
//     return (
//       <div className="container">
//         <h1>Food Container</h1>
//         <button onClick={this.getData}>Fetch Food Data</button> {/* Button label added */}
//       </div>
//     );
//   }
// }

// export default Food;

import React, { useState } from 'react';
import axios from 'axios';
import "./index.css" // Import your CSS file

const Food = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state

  const getData = async () => {
    const BaseURL = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    const aParams = { query };
    const options = {
      headers: {
        'x-app-id': "e28331cf",
        'x-app-key': "d578d9ba935d991b939fae6f0969dedf",
        'x-remote-user-id': "manoharv"
      }
    };

    setLoading(true); // Set loading to true when starting to fetch data

    try {
      const response = await axios.post(BaseURL, aParams, options);
      setData(response.data);
      setError(null);
      setQuery(''); // Clear the input field after fetching data
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      setError('Error fetching data');
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  return (
    <div className="food-container">
      <h1>Nutrition Info</h1>
      <input
        type="text"
        placeholder="Enter food item"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="food-input"
      />
      <button onClick={getData} className="fetch-button">Fetch Nutritional Info</button>

      {loading && <p className="loader">Loading...</p>} {/* Loader display */}

      {error && <p className="error-message">{error}</p>}
      
      {data && (
        <div className="nutrition-info">
          <h2>Nutritional Information for "{query}"</h2>
          <div className="card-container">
            {data.foods.map((food, index) => (
              <div key={index} className="food-card">
                <h3>{food.food_name}</h3>
                <img 
                  src={food.photo ? food.photo.thumb : `https://via.placeholder.com/150`} 
                  alt={food.food_name} 
                  className="food-image" 
                />
                <p><strong>Calories:</strong> {food.nf_calories}</p>
                <p><strong>Protein:</strong> {food.nf_protein}g</p>
                <p><strong>Fat:</strong> {food.nf_total_fat}g</p>
                <p><strong>Carbohydrates:</strong> {food.nf_total_carbohydrate}g</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Food;
