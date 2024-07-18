document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch data from db.json
    function fetchRecipes() {
        return fetch("db.json")
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(data) {
                return data.recipes; // Assuming your recipes are under 'recipes' key
            })
            .catch(function(error) {
                console.error('Error fetching data:', error);
                return [];
            });
    }

    // Function to update the UI with recipes
    function updateRecipes(recipes) {
        let placeholder = document.querySelector("#recipes");
        let recipeHTML = "";

        recipes.forEach(recipe => {
            recipeHTML += formatRecipe(recipe);
        });

        placeholder.innerHTML = recipeHTML;

        // Add event listeners for star ratings
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.dataset.value, 10);
                console.log(`Recipe ID: ${recipe.id} - Rating: ${value}`);
                // Add your logic here to handle the rating (e.g., update backend, UI, etc.)
            });
        });
    }

    // Function to format a single recipe into HTML table row
    function formatRecipe(recipe) {
        return `
            <tr>
                <td>${recipe.name}</td>
                <td>${recipe.preparation_time}</td>
                <td>${recipe.cooking_time}</td>
                <td>${recipe.ingredients}</td>
                <td>${recipe.description}</td>
                <td>${recipe.instructions}</td>
                <td><img src="${recipe.photo}" alt="Recipe Photo"></td>
                <td>
                    <span class="star" data-value="1">&#9733;</span>
                    <span class="star" data-value="2">&#9733;</span>
                    <span class="star" data-value="3">&#9733;</span>
                    <span class="star" data-value="4">&#9733;</span>
                    <span class="star" data-value="5">&#9733;</span>
                </td>
            </tr>
        `;
    }

    // Initial fetch and display of all recipes
    fetchRecipes().then(function(recipes) {
        updateRecipes(recipes);
    });
});
