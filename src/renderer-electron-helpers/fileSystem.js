var { remote } = window.require('electron');
var Promise = window.require('bluebird');
var fs = Promise.promisifyAll(window.require('fs'));
var path =  window.require('path');


var data = {
    lalala: "lololo",
    retest: 'retest'
};

var userFolder = remote.app.getPath('home');
var appFolder = path.join(remote.app.getPath('home'), '.eliquidines/');
var recipesFolder = path.join(appFolder, 'recipes');

function createAppFolder() {
    if (!fs.existsSync(appFolder)) {
        fs.mkdirSync(appFolder);
        fs.mkdirSync(recipesFolder);
    }
}

function testSave() {
    //var filePath = path.join(remote.app.getPath('home'), '.eliquidines/test.json')
    var filePath = path.join(recipesFolder, 'test.json');
    return fs.writeFileAsync(filePath, JSON.stringify(data, null, 2));
}


function loadRecipeList(){
    return fs.readFileAsync(
        path.join(appFolder, 'recipesList.json')
    )
}

function updateRecipesList(recipesList) {
    return fs.writeFileAsync(
        path.join(appFolder, 'recipesList.json'), 
        JSON.stringify(recipesList, null, 2)
    );
}

function saveRecipe(recipeId, recipeData, recipeList) {
    return fs.writeFileAsync(
        path.join(appFolder, 'recipesList.json'), 
        JSON.stringify(recipeList, null, 2)
    ) 
    .then( (result) => fs.writeFileAsync(
        path.join(recipesFolder, recipeId + '.json'), 
        JSON.stringify(recipeData, null, 2)
        ) 
    );
}

function loadRecipe(recipeId) {
    return fs.readFileAsync(
        path.join(recipesFolder, recipeId + '.json')
    );
}

function loadAllRecipes(recipeList) {
    var loadFilePromises = recipeList.map( (recipeId) => loadRecipe(recipeId));
    return Promise.all(loadFilePromises);
}

export default { createAppFolder, loadRecipeList, updateRecipesList, saveRecipe, loadRecipe, loadAllRecipes, testSave };