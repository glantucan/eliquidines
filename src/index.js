import m from 'mithril'
import model from './model.js'
import fileSys from './renderer-electron-helpers/fileSystem'

var root = document.getElementById('App');

//var mainProcess = window.require('electron').remote;


var App = {
    view(vnode) {
        return m('h1.test', 'Hello electron')
    }
}
m.mount(root, App)



fileSys.createAppFolder(); 

console.log("Loading recipes")

fileSys.loadAllRecipes()
    .then( (results) => { 
        results.forEach( (result) => { 
            var recipe = JSON.parse(result); 
            console.log('Recipe',recipe.name, recipe) 
        }); 
    })
    .catch( (error) => {console.error('ERROR:', error.message)})


// Followed this tutorial: https://medium.com/@yogeshkumarr/production-ready-electron-app-using-react-and-parcel-web-bundler-74dcda63f148
// https://github.com/kumarryogeshh/electron-react-parcel-boilerplate/blob/master/package.json

// see this also for an alternative https://github.com/distantcam/phaser-electron-typescript-parcel

// This one looks better, less dependencies: 
// IT'S WHAT I USED!!!
// https://github.com/Snjoo/parcel-react-electron/blob/master/package.json