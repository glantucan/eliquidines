import fileSys from './renderer-electron-helpers/fileSystem';
import { cloneDeep } from 'lodash';
var modelData = {};

function __replaceDiacritics(str) {
    return str.replace(/[Á]/g,"A")
    .replace(/[á]/g,"a")
    .replace(/[É]/g,"E")
    .replace(/[é]/g,"e")
    .replace(/[Í]/g,"I")
    .replace(/[í]/g,"i")
    .replace(/[Ó]/g,"O")
    .replace(/[ó]/g,"o")
    .replace(/[ÚÜ]/g,"U")
    .replace(/[úü]/g,"u")
    .replace(/[ñ]/g,"ny")
    .replace(/[¡!¿?]/g,""); 
}
function __replaceSpaces(str) {
    return str.replace(/\s+/g, '_');
}

function __recipeNameToId(str) {
    return __replaceDiacritics(__replaceSpaces(str));
}


function initialize(onInitialized) {
    fileSys.loadRecipeList()
        .then( function (results) {
            var recipeList = JSON.parse(results);
            fileSys.loadAllRecipes(recipeList)
                .then( (results) => { 
                    var recipes = results.map( (result) => JSON.parse(result) ); 
                    modelData.recipes = recipes.reduce ( 
                        function recipesCollector(recipesObj, recipe) {
                            recipesObj[ recipe.id || __recipeNameToId(recipe.name) ] = recipe;
                            return recipesObj;
                        },
                        {}
                    );
                    onInitialized();
                })
                .catch( function initializeError(error) {console.error('ERROR:', error.message)} )
            }
        )
}

var fakeBatchData = { 
    "name": "Heisenberg 1",
    "date": "2018-07-22T07:22",
    "target": {
        "volume": 100,
        "pg": 61,
        "vg": 39,
        "nic": 5
    },
    "nic": {
        "base": {
            "pg": 50,
            "vg": 50,
            "nic": 20
        }
    },
    "volume": 100,
    "base": {
        "pg": {
            "volume": 31.5,
            "weight": 34.1
        },
        "vg": {
            "volume": 34.135042,
            "weight": 33.98
        },
        "nic": {
            "volume": 25,
            "weight": 29.6
        }
    },
    "flavours": [
        {
            "name": "Heisemberg",
            "concentration": 17,
            "pgvg": 1,
            "volume": 17,
            "weight": 18.34
        },
        {
            "name": "Bohr",
            "concentration": 3,
            "pgvg": 1,
            "volume": 3,
            "weight": 3.21
        }
    ],
    "molecules": [
    ],
    "notes": {
        "2018-07-22 07:22:13": "Created the batch",
        "2018-07-30 14:41:53": "1st test. Seems ok. A little of chemical taste yet, but not sure whether it is just me"
    }
};
var currentBatchData = cloneDeep(fakeBatchData);

export default { 
    initialize,
    get recipes() {
        return { ...modelData.recipes }
    },
    get currentBatchData () {
        return  currentBatchData;
    },
    setBatchValue(property, value, type) {
        var val;
        if (property.includes('.')) {
            var propertyPath = property.split('.');
            var prop = propertyPath.pop();
            var propertyParent = propertyPath.reduce(
                (parent, current) => parent[current], 
                currentBatchData);
            

            if (type == 'number') {
                val = parseFloat(value);
                console.log(val);
                if (prop == 'vg') {
                    propertyParent['pg'] = 100 - val;
                } else if (prop == 'pg') {
                    propertyParent['vg'] = 100 - val;
                } 
            }
            propertyParent[prop] = (val !== undefined) ? val : value;
            
        } else {
            currentBatchData[property] = (val !== undefined) ? val : value;
        }
        console.log(currentBatchData);
    },
    removeFlavour(idx2remove) {
         currentBatchData.flavours = 
            currentBatchData.flavours.filter( (flavour, idx) => idx != idx2remove );
        console.log(currentBatchData.flavours) 
    }
};


/* 
var recipeList = ['testRecipe01']
fileSys.saveRecipe('testRecipe01', {
    name: 'testRecipe01',
    pg: 30,
    vg: 70,
    nic: 6
}, recipeList).then( (result) => {
    console.log('File testRecipe01 saved!')
}).catch( (err) => {
    console.log(err)
})


recipeList = ['testRecipe01', 'testRecipe02']
fileSys.saveRecipe('testRecipe02', {
    name: 'testRecipe02',
    pg: 10,
    vg: 90,
    nic: 2.5
}, recipeList).then( (result) => {
    console.log('File testRecipe02 saved!')
}).catch( (err) => {
    console.log(err)
}) */


//fileSys.loadRecipe('testRecipe02').then( (result) => {console.log(JSON.parse(result))})