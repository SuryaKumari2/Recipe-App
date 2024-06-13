// import React, {  useState } from 'react'
// import './App.css'
// const App = () => {
//   const [search,setSearch]=useState('');
//   const [recipes,setRecipes]=useState([]);
  
//   const appid = 'd13c580a';
//   const apikey = '96dbbd8c55b721b4accb53b8cc810f6f';
//   const submitHandler=async(e)=>{
//     e.preventDefault();
//     const url = `https://api.edamam.com/search?q=${encodeURIComponent(search)}&app_id=${appid}&app_key=${apikey}&from=0&to=20`;
//     try{
//       const response=await fetch(url);
//       if(!response.ok)
//         {
//           throw new Error('Network error');
//         }
//         const data=await response.json();
//         setRecipes(data.hits)
//     }
//     catch(e)
//     {
//       console.log(e);
//     }
    
    
  
//   }
//   return (
//     <div className='book'>
//       <form onSubmit={submitHandler}>
//         <center>
//           <h1>RECEIPE BOOK</h1>
//         <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder='search for receipe' className='input' />
//         <br/>
//         <input type='submit' value='Search'  className='search-button' />
//         </center>
//       </form>
      
      
//         {recipes.map((recipe, index) => (
//           <div key={index} className='recipe-box'>
//           <img src={recipe.recipe.image} />
//           <h5>{recipe.recipe.label}</h5>
//           </div>
//         ))}
      
//     </div>
//   )
// }

// export default App

import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [expandedRecipes, setExpandedRecipes] = useState({});

  const appid = 'd13c580a';
  const apikey = '96dbbd8c55b721b4accb53b8cc810f6f';

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = `https://api.edamam.com/search?q=${encodeURIComponent(search)}&app_id=${appid}&app_key=${apikey}&from=0&to=21`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network error');
      }
      const data = await response.json();
      setRecipes(data.hits);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleIngredients = (index) => {
    setExpandedRecipes((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className='container mt-4'>
      <form onSubmit={submitHandler}>
        <center>
          <h1>RECIPE BOOK</h1>
          <div className='form-group row justify-content-center'>
            <div className='col-md-6'>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
                placeholder='Search for a recipe'
                className='form-control input-custom'
              />
            </div>
            <div className='col-md-1'>
              <button type='submit' className='btn btn-primary btn-block '>Search</button>
            </div>
          </div>
        </center>
      </form>
      <div className='row mt-4'>
        {recipes.map((recipe, index) => (
          <div key={index} className='col-md-4 mb-4'>
            <div className='card h-100'>
              <img src={recipe.recipe.image} className='card-img-top' alt={recipe.recipe.label} />
              <div className='card-body'>
                <h5 className='card-title'>{recipe.recipe.label}</h5>
                <button className='btn btn-secondary' onClick={() => toggleIngredients(index)}>
                  {expandedRecipes[index] ? 'Show Less' : 'Read More'}
                </button>
                {expandedRecipes[index] && (
                  <div className='mt-3'>
                    <h6>Ingredients:</h6>
                    <ul className='list-unstyled'>
                      {recipe.recipe.ingredientLines.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


