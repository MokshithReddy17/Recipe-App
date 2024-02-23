const Searchbox = document.querySelector('.Searchbox');
const Searchbtn = document.querySelector('.Searchbtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const closebtn = document.querySelector('.recipe-close-btn');
const url='https://www.themealdb.com/api/json/v1/1/search.php?s=';
const fetchrecipe = async(query)=>{
    recipeContainer.innerHTML="<h2>Fetching recipe...</h2>";
    try {
    const data= await fetch(url+query);
    const response= await data.json();
    recipeContainer.innerHTML="";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div'); recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>

        `
        
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        })

        recipeContainer.appendChild(recipeDiv);
    })  
    
} catch (error) {
    
    recipeContainer.innerHTML="<h2>No Results Found...</h2>";

}}
const fetchIngredents = (meal)=> {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]; 
    if (ingredient) {
    const measure = meal[`strMeasure${i}`]; ingredientsList += `<li>${measure} ${ingredient}</li>`
    }
    else {
      break;
    }
    }
    return ingredientsList;
}
const openRecipePopup = (meal) => { recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3 class="ingredientList">Ingredents:</h3>
    <ul>${fetchIngredents(meal)}</ul>
    <div class="recipeInstructions">
      <h3>Instruction:</h3>
      <p>${meal.strInstructions}</p>
    </div>  

    `
    
    
    recipeDetailsContent.parentElement.style.display = "block";
    }
closebtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display = 'none';
})
Searchbtn.addEventListener('click',(e)=>{
  e.preventDefault();
  const searchinp= Searchbox.value.trim();
  if(!searchinp){
    recipeContainer.innerHTML=`<h2>Type your meal in the search box.</h2>`
    return;
  }
  fetchrecipe(searchinp);
      //console.log("Button Clicked");
});