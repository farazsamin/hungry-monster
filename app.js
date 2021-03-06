document.getElementById("search").addEventListener("click", function () {
  let name = document.getElementById("food-search").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data.meals)
      displayFoods(data.meals);
    })
    .catch(err => {
      const foodsDiv = document.getElementById("foods");
      foodsDiv.innerText = "";
      const foodDiv = document.createElement('div');
      const foodInfo = `
         <h1>No Result Found</h1>   
    `
    foodDiv.innerHTML = foodInfo;
    foodsDiv.appendChild(foodDiv);

    });
});

const displayFoods = foods => {
  const foodsDiv = document.getElementById("foods");
  foodsDiv.innerText = "";

  foods.forEach(food => {
    const foodDiv = document.createElement('div');
    foodDiv.className = 'food';
    const foodInfo = `
         <a href="#start" onclick="displayFoodDetail('${food.idMeal}')">
         <img class="food-img" src="${food.strMealThumb}">
         <p class="food-name">${food.strMeal}</p>
         </a>   
    `
    foodDiv.innerHTML = foodInfo;
    foodsDiv.appendChild(foodDiv);
  });
}

const displayFoodDetail = id => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      renderFoodInfo(data.meals[0]);
    });
}

const renderFoodInfo = food => {
  const foodDetailDiv = document.getElementById('foodDetail');
  foodDetailDiv.innerText = "";
  const foodDetail = `
      <img src="${food.strMealThumb}">
      <h3>${food.strMeal}</h3>
      <h5>Ingredients : </h5>
      <p>${food.strMeasure1} ${food.strIngredient1}</p>
      <p>${food.strMeasure2} ${food.strIngredient2}</p>
      <p>${food.strMeasure3} ${food.strIngredient3}</p>
      <p>${food.strMeasure4} ${food.strIngredient4}</p>
      <p>${food.strMeasure5} ${food.strIngredient5}</p>
      <p>${food.strMeasure6} ${food.strIngredient6}</p>
      <p>${food.strMeasure7} ${food.strIngredient7}</p>
      <p>${food.strMeasure8} ${food.strIngredient8}</p>
      <p>${food.strMeasure9} ${food.strIngredient9}</p>
      <p>${food.strMeasure10} ${food.strIngredient10}</p>
     
  `
  foodDetailDiv.innerHTML = foodDetail;
}