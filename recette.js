const recipes = {
  mojito: {
    tools: ["Verre long drink", "Cuillère", "Pilonneur"],
    ingredients: ["6 feuilles de menthe", "1/2 citron vert", "2 c. à café de sucre", "4 cl de rhum blanc", "Eau gazeuse", "Glace pilée"],
    steps: [
      "Mettre les feuilles de menthe et le sucre dans le verre.",
      "Ajouter le citron vert coupé en morceaux et piler légèrement.",
      "Remplir de glace pilée.",
      "Verser le rhum puis compléter avec de l’eau gazeuse.",
      "Mélanger doucement avec la cuillère."
    ]
  },

  martini: {
    tools: ["Verre à cocktail", "Cuillère à mélange", "Verre à mélange"],
    ingredients: ["6 cl de gin", "1 cl de vermouth dry", "Zeste de citron ou olive verte"],
    steps: [
      "Verser le gin et le vermouth dans un verre à mélange avec des glaçons.",
      "Remuer délicatement 30 secondes.",
      "Filtrer dans un verre à cocktail.",
      "Ajouter une olive ou un zeste de citron."
    ]
  },

  pina_colada: {
    tools: ["Shaker", "Verre à cocktail", "Mixeur (optionnel)"],
    ingredients: ["4 cl de rhum blanc", "2 cl de crème de coco", "4 cl de jus d’ananas", "Glaçons"],
    steps: [
      "Verser tous les ingrédients dans un shaker avec des glaçons.",
      "Secouer énergiquement.",
      "Filtrer et verser dans un verre à cocktail.",
      "Décorer avec un morceau d’ananas ou une cerise."
    ]
  },

  virgin_sunrise: {
    tools: ["Verre long drink", "Cuillère"],
    ingredients: ["10 cl de jus d’orange", "2 cl de sirop de grenadine", "Glaçons"],
    steps: [
      "Remplir un verre de glaçons.",
      "Verser le jus d’orange.",
      "Ajouter doucement le sirop de grenadine sans mélanger pour obtenir l'effet 'sunrise'."
    ]
  },

  virgin_mojito: {
    tools: ["Verre long drink", "Cuillère", "Pilonneur"],
    ingredients: ["6 feuilles de menthe", "1/2 citron vert", "2 c. à café de sucre", "Eau gazeuse", "Glace pilée"],
    steps: [
      "Mettre les feuilles de menthe et le sucre dans le verre.",
      "Ajouter le citron vert coupé en morceaux et piler légèrement.",
      "Remplir de glace pilée.",
      "Compléter avec de l’eau gazeuse.",
      "Mélanger doucement avec la cuillère."
    ]
  },

  daiquiri: {
    tools: ["Shaker", "Verre à cocktail"],
    ingredients: ["4 cl de rhum blanc", "2 cl de jus de citron vert", "2 cl de sirop de sucre de canne", "Glaçons"],
    steps: [
      "Verser tous les ingrédients dans un shaker avec des glaçons.",
      "Secouer vigoureusement.",
      "Filtrer et verser dans un verre à cocktail."
    ]
  },

  margarita: {
    tools: ["Shaker", "Verre à margarita ou à cocktail", "Assiette pour le sel"],
    ingredients: ["4 cl de tequila", "2 cl de triple sec (Cointreau)", "2 cl de jus de citron vert", "Glaçons", "Sel pour givrer le verre"],
    steps: [
      "Givrer le bord du verre avec du citron vert et du sel.",
      "Verser tous les ingrédients dans un shaker avec des glaçons.",
      "Secouer vigoureusement.",
      "Filtrer et verser dans le verre."
    ]
  }
};

function showRecipe(cocktail) {
  const recipe = recipes[cocktail];
  document.querySelector(".cocktail-title").textContent = cocktail.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  const toolsList = document.getElementById("tools-list");
  const ingredientsList = document.getElementById("ingredients-list");
  const stepsList = document.getElementById("steps-list");

  toolsList.innerHTML = "";
  ingredientsList.innerHTML = "";
  stepsList.innerHTML = "";

  recipe.tools.forEach(tool => {
    const li = document.createElement("li");
    li.textContent = tool;
    toolsList.appendChild(li);
  });

  recipe.ingredients.forEach(ingredient => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });

  recipe.steps.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    stepsList.appendChild(li);
  });
}
