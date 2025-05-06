// Données de l'application
let appData = {
recipes: \[
{
id: 1,
name: "Mojito",
ingredients: "6 feuilles de menthe\n2 cl de sirop de sucre\n6 cl de rhum blanc\n3 cl de jus de citron vert\nEau gazeuse",
method: "1. Écraser légèrement la menthe avec le sirop de sucre\n2. Ajouter le rhum et le jus de citron\n3. Remplir de glaçons\n4. Compléter avec l'eau gazeuse\n5. Mélanger délicatement",
glass: "Verre highball",
garnish: "Branche de menthe et rondelle de citron"
},
{
id: 2,
name: "Margarita",
ingredients: "5 cl de tequila\n2 cl de triple sec\n3 cl de jus de citron vert\n1 cl de sirop de sucre",
method: "1. Tremper le bord du verre dans du jus de citron puis du sel\n2. Dans un shaker, mélanger tous les ingrédients avec des glaçons\n3. Shaker vigoureusement\n4. Verser dans le verre avec des glaçons",
glass: "Verre à margarita",
garnish: "Tranche de citron vert"
}
],
profiles: \[
{
id: 1,
name: "Bar Le Paradis",
description: "Bar à cocktails haut de gamme",
favoriteRecipes: \[1]
}
],
currentOrder: {
profileId: null,
items: \[]
}
};

// Éléments DOM
const pages = {
home: document.getElementById('home-page'),
recipes: document.getElementById('recipes-page'),
profiles: document.getElementById('profiles-page'),
orders: document.getElementById('orders-page')
};

// Navigation
document.querySelectorAll('nav a').forEach(link => {
link.addEventListener('click', (e) => {
e.preventDefault();
const pageId = e.target.id.replace('-link', '-page');
showPage(pageId);
});
});

document.querySelectorAll('.access-btn').forEach(btn => {
btn.addEventListener('click', (e) => {
const page = e.target.dataset.page + '-page';
showPage(page);
});
});

function showPage(pageId) {
// Cacher toutes les pages
Object.values(pages).forEach(page => {
page.classList.remove('active');
});

```
// Afficher la page sélectionnée
document.getElementById(pageId).classList.add('active');

// Charger les données si nécessaire
if (pageId === 'recipes-page') {
    loadRecipes();
} else if (pageId === 'profiles-page') {
    loadProfiles();
} else if (pageId === 'orders-page') {
    loadOrderPage();
}
```

}

// Gestion des recettes
document.getElementById('add-recipe-btn').addEventListener('click', () => {
document.getElementById('recipe-form-container').classList.remove('hidden');
});

document.getElementById('cancel-recipe-btn').addEventListener('click', () => {
document.getElementById('recipe-form-container').classList.add('hidden');
document.getElementById('recipe-form').reset();
});

document.getElementById('recipe-form').addEventListener('submit', (e) => {
e.preventDefault();

```
const newRecipe = {
    id: appData.recipes.length > 0 ? Math.max(...appData.recipes.map(r => r.id)) + 1 : 1,
    name: document.getElementById('recipe-name').value,
    ingredients: document.getElementById('recipe-ingredients').value,
    method: document.getElementById('recipe-method').value,
    glass: document.getElementById('recipe-glass').value,
    garnish: document.getElementById('recipe-garnish').value
};

appData.recipes.push(newRecipe);
loadRecipes();
document.getElementById('recipe-form-container').classList.add('hidden');
document.getElementById('recipe-form').reset();
```

});

function loadRecipes() {
const container = document.getElementById('recipes-list');
container.innerHTML = '';

```
appData.recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Verre:</strong> ${recipe.glass}</p>
        <p><strong>Garniture:</strong> ${recipe.garnish}</p>
        <button class="view-recipe-btn" data-id="${recipe.id}">Voir détails</button>
    `;
    container.appendChild(card);
});

// Ajouter les événements pour voir les détails
document.querySelectorAll('.view-recipe-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const recipeId = parseInt(e.target.dataset.id);
        viewRecipeDetails(recipeId);
    });
});
```

}

function viewRecipeDetails(recipeId) {
const recipe = appData.recipes.find(r => r.id === recipeId);
if (!recipe) return;

```
alert(`Détails de ${recipe.name}:\n\nIngrédients:\n${recipe.ingredients}\n\nMéthode:\n${recipe.method}`);
```

}

// Gestion des profils (similaire aux recettes)
document.getElementById('add-profile-btn').addEventListener('click', () => {
document.getElementById('profile-form-container').classList.remove('hidden');
});

document.getElementById('cancel-profile-btn').addEventListener('click', () => {
document.getElementById('profile-form-container').classList.add('hidden');
document.getElementById('profile-form').reset();
});

document.getElementById('profile-form').addEventListener('submit', (e) => {
e.preventDefault();

```
const newProfile = {
    id: appData.profiles.length > 0 ? Math.max(...appData.profiles.map(p => p.id)) + 1 : 1,
    name: document.getElementById('profile-name').value,
    description: document.getElementById('profile-description').value,
    favoriteRecipes: []
};

appData.profiles.push(newProfile);
loadProfiles();
document.getElementById('profile-form-container').classList.add('hidden');
document.getElementById('profile-form').reset();
```

});

function loadProfiles() {
const container = document.getElementById('profiles-list');
container.innerHTML = '';

```
appData.profiles.forEach(profile => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3>${profile.name}</h3>
        <p>${profile.description || 'Aucune description'}</p>
        <button class="view-profile-btn" data-id="${profile.id}">Voir détails</button>
    `;
    container.appendChild(card);
});

// Ajouter les événements pour voir les détails
document.querySelectorAll('.view-profile-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const profileId = parseInt(e.target.dataset.id);
        viewProfileDetails(profileId);
    });
});
```

}

function viewProfileDetails(profileId) {
const profile = appData.profiles.find(p => p.id === profileId);
if (!profile) return;

```
let favorites = 'Aucune recette favorite';
if (profile.favoriteRecipes.length > 0) {
    favorites = profile.favoriteRecipes.map(id => {
        const recipe = appData.recipes.find(r => r.id === id);
        return recipe ? recipe.name : 'Recette inconnue';
    }).join(', ');
}

alert(`Profil de ${profile.name}:\n\nDescription: ${profile.description || 'Aucune'}\n\nRecettes favorites: ${favorites}`);
```

}

// Gestion des commandes
function loadOrderPage() {
// Charger les profils dans le select
const profileSelect = document.getElementById('order-profile-select');
profileSelect.innerHTML = '<option value="">Sélectionnez un profil</option>';
appData.profiles.forEach(profile => {
const option = document.createElement('option');
option.value = profile.id;
option.textContent = profile.name;
profileSelect.appendChild(option);
});

```
// Charger les recettes dans le select
const recipeSelect = document.getElementById('order-recipe-select');
recipeSelect.innerHTML = '<option value="">Sélectionnez une recette</option>';
appData.recipes.forEach(recipe => {
    const option = document.createElement('option');
    option.value = recipe.id;
    option.textContent = recipe.name;
    recipeSelect.appendChild(option);
});

// Mettre à jour l'affichage de la commande
updateOrderDisplay();
```

}

document.getElementById('add-to-order-btn').addEventListener('click', () => {
const profileId = parseInt(document.getElementById('order-profile-select').value);
const recipeId = parseInt(document.getElementById('order-recipe-select').value);

```
if (!profileId || !recipeId) {
    alert('Veuillez sélectionner un profil et une recette');
    return;
}

// Si c'est une nouvelle commande ou un changement de profil
if (appData.currentOrder.profileId !== profileId) {
    appData.currentOrder = {
        profileId: profileId,
        items: []
    };
}

// Ajouter la recette à la commande
appData.currentOrder.items.push(recipeId);
updateOrderDisplay();
```

});

function updateOrderDisplay() {
const orderList = document.getElementById('current-order-list');
const prepDetails = document.getElementById('order-preparation-details');
const ingredientsList = document.getElementById('order-ingredients-list');

```
orderList.innerHTML = '';
prepDetails.innerHTML = '';
ingredientsList.innerHTML = '';

if (appData.currentOrder.items.length === 0) {
    orderList.innerHTML = '<li>Aucun élément dans la commande</li>';
    return;
}

// Compter les occurrences de chaque recette
const recipeCounts = {};
appData.currentOrder.items.forEach(id => {
    recipeCounts[id] = (recipeCounts[id] || 0) + 1;
});

// Afficher les éléments de la commande
for (const [id, count] of Object.entries(recipeCounts)) {
    const recipe = appData.recipes.find(r => r.id === parseInt(id));
    if (recipe) {
        const li = document.createElement('li');
        li.innerHTML = `${recipe.name} <span class="count">x${count}</span>`;
        orderList.appendChild(li);
        
        // Ajouter les détails de préparation
        const prepDiv = document.createElement('div');
        prepDiv.className = 'recipe-prep';
        prepDiv.innerHTML = `<h4>${recipe.name}</h4><p>${recipe.method}</p>`;
        prepDetails.appendChild(prepDiv);
        
        // Ajouter les ingrédients (simplifié)
        recipe.ingredients.split('\n').forEach(ing => {
            const ingLi = document.createElement('li');
            ingLi.textContent = `${ing} (x${count})`;
            ingredientsList.appendChild(ingLi);
        });
    }
}
```

}

// Afficher la page d'accueil au chargement
showPage('home-page');
