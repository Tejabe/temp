// const searchBox = document.querySelector('.searchBox');
// const searchBtn = document.querySelector('.searchBtn');
// const recipeContainer  = document.querySelector('.recipe-container');

// const fetchRecipes = async (query) => {
//     // 
//     const data = await fetch('www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
//     const response = await data.json();
//     console.log(response);
    
// }

// searchBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     const searchInput = searchBox.value.trim();
//     fetchRecipes(searchInput);
//     // console.log("buttonclicked");  
// })


const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipedetailscontent = document.querySelector('.recipe-details-content');
const recipecloseBtn = document.querySelector('.recipe-closeBtn');

const fetchRecipes = async (query) => {
    // recipeContainer.innerHTML = "Fetching Recipes....";
    try {
        recipeContainer.innerHTML = "<h2>Fetching Recipes....</h2>";
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        // console.log(response.meals[0]);
        recipeContainer.innerHTML="";
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML= `
            <img src = "${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span>Dish</p>
            <p>belongs to <span>${meal.strCategory}</span> Category</p>
            `
            const button = document.createElement('button');
            button.textContent="view Recipe";
            recipeDiv.appendChild(button);

            button.addEventListener('click',()=>{
                openRecipepopup(meal);
            });

            recipeContainer.appendChild(recipeDiv);
            
        })
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
};

const openrecipePopUp = (meal) => {
    recipedetailscontent.textContent = `
    <h2>${meal.StrMeal}</h2>
    `
    recipedetailscontent.parentElement.style.display = "block";
}

if (searchBtn && searchBox) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const searchInput = searchBox.value.trim();
        if (searchInput) {
            fetchRecipes(searchInput);
        } else {
            console.log("Search input is empty.");
        }
    });
} else {
    console.error("SearchBox or SearchBtn not found in the DOM.");
}
