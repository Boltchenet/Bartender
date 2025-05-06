// Données des établissements
const establishmentsData = [
    {
        id: "le-speakeasy",
        name: "Le Speakeasy",
        location: "Paris, 11ème",
        image: "img/bars/speakeasy.jpg",
        cocktails: [
            {
                id: "mojito-signature",
                name: "Mojito Signature",
                type: "Classique revisité",
                image: "img/cocktails/mojito.jpg",
                ingredients: [
                    "6 feuilles de menthe fraîche",
                    "4 cl de rhum cubain",
                    "2 cl de sirop de canne",
                    "1/2 citron vert coupé",
                    "Eau gazeuse"
                ],
                tools: [
                    "Verre highball",
                    "Pilon",
                    "Cuillère à mélange",
                    "Passoire"
                ],
                steps: [
                    "Piler légèrement la menthe avec le sirop dans un verre",
                    "Ajouter le citron coupé en morceaux",
                    "Verser le rhum et remplir de glace pilée",
                    "Compléter avec de l'eau gazeuse et mélanger délicatement",
                    "Décorer avec une branche de menthe et une rondelle de citron"
                ]
            },
            {
                id: "martini-exclusive",
                name: "Martini Exclusive",
                type: "Création maison",
                image: "img/cocktails/martini.jpg",
                ingredients: [
                    "6 cl de gin premium",
                    "1 cl de vermouth dry",
                    "Zeste de citron",
                    "1 olive"
                ],
                tools: [
                    "Verre à martini",
                    "Shaker",
                    "Passoire fine",
                    "Zesteuse"
                ],
                steps: [
                    "Mélanger le gin et le vermouth avec des glaçons",
                    "Filtrer dans un verre à martini refroidi",
                    "Exprimer un zeste de citron sur le dessus",
                    "Ajouter une olive en décoration"
                ]
            }
        ]
    },
    {
        id: "la-cantina",
        name: "La Cantina",
        location: "Lyon, Vieux Lyon",
        image: "img/bars/cantina.jpg",
        cocktails: [
            {
                id: "margarita-spicy",
                name: "Margarita Spicy",
                type: "Spécialité mexicaine",
                image: "img/cocktails/margarita.jpg",
                ingredients: [
                    "5 cl de tequila reposado",
                    "2 cl de triple sec",
                    "3 cl de jus de citron vert",
                    "1 pincée de sel",
                    "1 tranche de piment jalapeño (optionnel)"
                ],
                tools: [
                    "Verre à margarita",
                    "Shaker",
                    "Passoire",
                    "Trancheuse"
                ],
                steps: [
                    "Saler le bord d'un verre à margarita",
                    "Shaker tous les ingrédients avec des glaçons",
                    "Verser dans le verre avec de la glace",
                    "Décorer avec une tranche de citron et de piment"
                ]
            }
        ]
    },
    {
        id: "rooftop-47",
        name: "Rooftop 47",
        location: "Marseille, Vieux Port",
        image: "img/bars/rooftop.jpg",
        cocktails: [
            {
                id: "cosmopolitan",
                name: "Cosmopolitan",
                type: "Cocktail fruité",
                image: "img/cocktails/cosmopolitan.jpg",
                ingredients: [
                    "4 cl de vodka citron",
                    "2 cl de triple sec",
                    "3 cl de jus de cranberry",
                    "1 cl de jus de citron vert"
                ],
                tools: [
                    "Verre à martini",
                    "Shaker",
                    "Passoire fine",
                    "Zesteuse"
                ],
                steps: [
                    "Shaker tous les ingrédients avec des glaçons",
                    "Filtrer dans un verre à martini refroidi",
                    "Décorer avec un zeste d'orange"
                ]
            }
        ]
    }
];

// Variables globales
let currentEstablishment = null;
let currentCocktail = null;

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadEstablishments();
});

// Charger les établissements
function loadEstablishments() {
    const container = document.getElementById('establishments-container');
    
    establishmentsData.forEach(establishment => {
        const card = document.createElement('div');
        card.className = 'establishment-card';
        card.setAttribute('data-id', establishment.id);
        card.innerHTML = `
            <img src="${establishment.image}" alt="${establishment.name}" class="establishment-img">
            <div class="establishment-info">
                <h3 class="establishment-name">${establishment.name}</h3>
                <p class="establishment-location">${establishment.location}</p>
            </div>
        `;
        container.appendChild(card);
        
        card.addEventListener('click', () => {
            selectEstablishment(establishment.id);
        });
    });
    
    // Sélectionner le premier établissement par défaut
    if (establishmentsData.length > 0) {
        selectEstablishment(establishmentsData[0].id);
    }
}

// Sélectionner un établissement
function selectEstablishment(establishmentId) {
    // Mettre à jour l'interface
    document.querySelectorAll('.establishment-card').forEach(card => {
        card.classList.remove('active');
        if (card.getAttribute('data-id') === establishmentId) {
            card.classList.add('active');
        }
    });
    
    // Trouver l'établissement
    const establishment = establishmentsData.find(e => e.id === establishmentId);
    if (!establishment) return;
    
    currentEstablishment = establishment;
    
    // Charger les cocktails
    loadCocktails(establishment.cocktails);
    
    // Sélectionner le premier cocktail
    if (establishment.cocktails.length > 0) {
        selectCocktail(establishment.cocktails[0].id);
    } else {
        clearCocktailDetails();
    }
}

// Charger la liste des cocktails
function loadCocktails(cocktails) {
    const container = document.getElementById('cocktails-list');
    container.innerHTML = '';
    
    cocktails.forEach(cocktail => {
        const item = document.createElement('div');
        item.className = 'cocktail-item';
        item.setAttribute('data-id', cocktail.id);
        item.innerHTML = `
            <h4>${cocktail.name}</h4>
            <p>${cocktail.type}</p>
        `;
        container.appendChild(item);
        
        item.addEventListener('click', () => {
            selectCocktail(cocktail.id);
        });
    });
}

// Sélectionner un cocktail
function selectCocktail(cocktailId) {
    if (!currentEstablishment) return;
    
    // Mettre à jour l'interface
    document.querySelectorAll('.cocktail-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-id') === cocktailId) {
            item.classList.add('active');
        }
    });
    
    // Trouver le cocktail
    const cocktail = currentEstablishment.cocktails.find(c => c.id === cocktailId);
    if (!cocktail) return;
    
    currentCocktail = cocktail;
    
    // Afficher les détails
    showCocktailDetails(cocktail);
}

// Afficher les détails du cocktail
function showCocktailDetails(cocktail) {
    // Image
    const image = document.getElementById('cocktail-image');
    image.src = cocktail.image;
    image.alt = cocktail.name;
    
    // Nom et type
    document.getElementById('cocktail-name').textContent = cocktail.name;
    document.getElementById('cocktail-type').textContent = cocktail.type;
    
    // Ingrédients
    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = '';
    cocktail.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
    
    // Outils
    const toolsList = document.getElementById('tools-list');
    toolsList.innerHTML = '';
    cocktail.tools.forEach(tool => {
        const li = document.createElement('li');
        li.textContent = tool;
        toolsList.appendChild(li);
    });
    
    // Étapes
    const stepsList = document.getElementById('recipe-steps');
    stepsList.innerHTML = '';
    cocktail.steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        stepsList.appendChild(li);
    });
}

// Effacer les détails du cocktail
function clearCocktailDetails() {
    document.getElementById('cocktail-image').src = '';
    document.getElementById('cocktail-image').alt = '';
    document.getElementById('cocktail-name').textContent = 'Sélectionnez un cocktail';
    document.getElementById('cocktail-type').textContent = '';
    document.getElementById('ingredients-list').innerHTML = '<li class="empty-state">Aucun cocktail sélectionné</li>';
    document.getElementById('tools-list').innerHTML = '<li class="empty-state">Aucun cocktail sélectionné</li>';
    document.getElementById('recipe-steps').innerHTML = '<li class="empty-state">Aucun cocktail sélectionné</li>';
}