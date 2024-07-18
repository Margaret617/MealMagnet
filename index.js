
document.addEventListener('DOMContentLoaded', function () {
    let recipesData = [];
    const searchInput = document.getElementById('searchInput');
    const placeholder = document.querySelector("#recipes");

    fetch("db.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(recipes) {
            recipesData = recipes;
            displayRecipes(recipes);
        })
        .catch(function(error) {
            console.log(error);
        });

    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredRecipes = recipesData.filter(recipe => 
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.join(', ').toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm)
        );
        displayRecipes(filteredRecipes);
    });

    function displayRecipes(recipes) {
        let recipeHTML = "";

        recipes.forEach(recipe => {

            recipeHTML += `
                <tr>
                    <td>${recipe.name}</td>
                    <td>${recipe.preparation_time}</td>
                    <td>${recipe.cooking_time}</td>
                    <td>${recipe.ingredients}</td>
                    <td>${recipe.description}</td>
                    <td>${recipe.instructions}</td>
                    <td><img src='${recipe.photo}' alt='home image'></td>
                </tr>
            `;
        });

        placeholder.innerHTML = recipeHTML;
    }

});