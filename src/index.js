import activateContextmenu from './renderer-electron-helpers/devInspect';
import m from 'mithril';
import model from './model';
import fileSys from './renderer-electron-helpers/fileSystem';
import TextField from './TextField';
import DataCell from './DataCell';
import InputCell from './InputCell';
import './style_fonts.css';
import './style_cells.css';
import './style.css';

if (process.env.NODE_ENV == 'development') { activateContextmenu() }

var root = document.getElementById('App');
//var mainProcess = window.require('electron').remote;

function CellsRow() {
    return {
        view(vnode) {
            var { className } = vnode.attrs;
            return m('.cells-row', {
                    class: className
                },
                vnode.children
            );
        }
    };
}



function BatchForm() {
    return {
        view(vnode) {
            var { batchData, calculator } = vnode.attrs;

            return m('form.batch-form', {

                }, 
                [
                    m( TextField, {
                        className: 'batch-title',
                        label: 'Title',
                        value: batchData.name,
                        name: 'name', 
                        onChange(value) { model.setBatchValue('name', value) }
                    } ),  
                    m( TextField, {
                        className: 'batch-date',
                        label: 'Date',
                        value: batchData.date,
                        name: 'date', 
                        type: 'datetime-local', 
                        onChange(value) { model.setBatchValue('date', value) }
                    } ),
                    m('fieldset',
                        m('legend', 'Base target'),
                        m( TextField, {
                            className: 'batch-target-volume',
                            name: 'target-volume', 
                            label: 'Volume (ml)',
                            type: 'number',
                            value: batchData.target.volume,
                            onChange(value) { model.setBatchValue('target.volume', value, 'number') }
                        } ),  
                        m( TextField, {
                            className: 'batch-target-pg',
                            name: 'target-pg', 
                            label: 'PG (%)',
                            type: 'number',
                            min: 0,
                            max: 100,
                            value: batchData.target.pg,
                            onChange(value) { model.setBatchValue('target.pg', value, 'number') }
                        } ),  
                        m( TextField, {
                            className: 'batch-target-bg',
                            name: 'target-vg', 
                            label: 'VG (%)',
                            type: 'number',
                            min: 0,
                            max: 100,
                            value: batchData.target.vg,
                            onChange(value) { model.setBatchValue('target.vg', value, 'number') }
                        } ),  
                        m( TextField, {
                            className: 'batch-target-nic',
                            name: 'target-nic', 
                            label: 'Nic (mg/ml)',
                            type: 'number',
                            value: batchData.target.nic,
                            onChange(value) { model.setBatchValue('target.nic', value, 'number') }
                        } ), 
                    ),
                    m('fieldset',
                        m('legend', 'Nic - Shot'),
                        
                        m( TextField, {
                            className: 'batch-nic-shot-pg',
                            name: 'nic-shot-pg', 
                            label: 'Nic-Shot PG (%)',
                            type: 'number',
                            min: 0,
                            max: 100,
                            value: batchData.nic.base.pg,
                            onChange(value) { model.setBatchValue('nic.base.pg', value, 'number') }
                        } ),  
                        m( TextField, {
                            className: 'batch-nic-shot-bg',
                            name: 'nic-shot-vg', 
                            label: 'Nic-Shot VG (%)',
                            type: 'number',
                            min: 0,
                            max: 100,
                            value: batchData.nic.base.vg,
                            onChange(value) { model.setBatchValue('nic.base.vg', value, 'number') }
                        } ),  
                        m( TextField, {
                            className: 'batch-nic-shot-nic',
                            name: 'nic-shot-nic', 
                            label: 'Nic-Shot Nic (mg/ml)',
                            type: 'number',
                            min: 0,
                            max: 100,
                            value: batchData.nic.base.nic,
                            onChange(value) { model.setBatchValue('nic.base.nic', value, 'number') }
                        } ),    
                        
                    ),
                    m('fieldset',
                        m('legend', 'Base - volumes & weights'),
                        m( CellsRow, {
                                className: 'batch-base-title-row'
                            },
                            m( DataCell, { className: 'w-70 empty-cell' }),
                            m( DataCell, {
                                className: 'w-15 center batch-base-title-volume',
                                value: 'Volume (ml)',
                            }),
                            m( DataCell, {
                                className: 'w-15 center batch-base-title-weight',
                                value: 'Weight (mg)',
                            }),
                        ),
                        m( CellsRow, {
                                className: 'cells-row-odd batch-base-pg'
                            },
                            m( DataCell, { className: 'w-55 empty-cell' }),
                            m( DataCell, {
                                className: 'w-15 row-title',
                                value: 'PG (%)'
                            }),
                            m( DataCell, {
                                className: 'w-15 center batch-base-pg-volume',
                                type: 'number',
                                value: batchData.base.pg.volume,
                            }),
                            m( DataCell, {
                                className: 'w-15 center batch-base-pg-weight',
                                type: 'number',
                                value: batchData.base.pg.weight,
                            }),
                        ),
                        m( CellsRow, {
                                className: 'cells-row-even batch-base-vg'
                            },
                            m( DataCell, { className: 'w-55 empty-cell' }),
                            m( DataCell, {
                                className: 'w-15 row-title',
                                value: 'VG (%)'
                            }),
                            m( DataCell, {
                                className: 'w-15 center batch-base-vg-volume',
                                type: 'number',
                                value: batchData.base.vg.volume,
                            }),
                            m( DataCell, {
                                className: 'w-15 center batch-base-vg-weight',
                                type: 'number',
                                value: batchData.base.vg.weight,
                            }),
                        ),
                        m( CellsRow, {
                                className: 'cells-row-odd batch-base-nic'
                            },
                            m( DataCell, { className: 'w-55 empty-cell' }),
                            m( DataCell, {
                                className: 'w-15 row-title',
                                value: 'Nicotine'
                            }),
                            m( DataCell, {
                                className: 'w-15 center batch-base-nic-volume',
                                type: 'number',
                                value: batchData.base.nic.volume,
                            }),
                            m( DataCell, {
                                className: 'w-15 center batch-base-nic-weight',
                                type: 'number',
                                value: batchData.base.nic.weight,
                            }),
                        )
                    ),
                    m('fieldset',
                        m('legend', 'Flavours'),
                        m( CellsRow, {
                                className: 'batch-base-title-row'
                            },
                            m( DataCell, { className: 'w-40 empty-cell' }),
                            m( DataCell, {
                                className: 'w-15 center batch-flavours-title-concentration',
                                value: 'Conc (%)',
                            }),
                            m( DataCell, {
                                className: 'w-15 center batch-flavours-title-pg-vg-ratio',
                                value: 'PG-VG ratio',
                            }),
                            m( DataCell, {
                                className: 'w-15 center batch-flavours-title-volume',
                                value: 'Volume (ml)',
                            }),
                            m( DataCell, {
                                className: 'w-15 center batch-flavours-title-weight',
                                value: 'Weight (mg)',
                            }),
                        ),
                        m( CellsRow, {
                                className: 'cells-row-odd batch-base-pg'
                            },
                            m( InputCell, {
                                className: 'w-40 row-title',
                                value: batchData.flavours[0].name
                            }),
                            m( InputCell, {
                                className: 'w-15 center batch-flavour-concentration',
                                type: 'number',
                                value: batchData.flavours[0].concentration,
                            }),
                            m( InputCell, {
                                className: 'w-15 center batch-flavour-pg-vg-ratio',
                                type: 'number',
                                value: batchData.flavours[0].pgvg,
                            }),
                            m( DataCell, {
                                className: 'w-15 center batch-base-pg-volume',
                                type: 'number',
                                value: batchData.flavours[0].volume,
                            }),
                            m( DataCell, {
                                className: 'w-15 center batch-base-pg-weight',
                                type: 'number',
                                value: batchData.flavours[0].weight,
                            }),
                        ),
                    )

                ]
            );
        }
    }
}

console.log(model.currentBatchData);
console.log(new Date(model.currentBatchData.date))
var App = {
    view(vnode) {
        return m('.App-container',
            m('h1.test', 'E-liquidines'), 
            m( BatchForm, {
                batchData: model.currentBatchData
            } )
        );
    }
}







model.initialize(onceInitialized);

function onceInitialized(){
    console.log(model.recipes);
    
}
m.mount(root, App);
/* 

fileSys.loadAllRecipes()
    .then( (results) => { 
        results.forEach( (result) => { 
            var recipe = JSON.parse(result); 
            console.log(recipe.name, recipe) 
        }); 
    })
    .catch( (error) => {console.error('ERROR:', error.message)})
 */

// Followed this tutorial: https://medium.com/@yogeshkumarr/production-ready-electron-app-using-react-and-parcel-web-bundler-74dcda63f148
// https://github.com/kumarryogeshh/electron-react-parcel-boilerplate/blob/master/package.json

// see this also for an alternative https://github.com/distantcam/phaser-electron-typescript-parcel

// This one looks better, less dependencies: 
// IT'S WHAT I USED!!!
// https://github.com/Snjoo/parcel-react-electron/blob/master/package.json