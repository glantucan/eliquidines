import m from 'mithril';

function DataCell() {

    return {
        view(vnode) {
            var { value, name, className, type, onChange, min, max} = vnode.attrs;

            return m('.data-cell', {
                    class: className,
                },
                m('.data-cell-value', 
                    type == 'number' ? 
                        __separateDecimalsForAlignment(value) : 
                        value
                )
            );
        }
    }
}

export default DataCell;




//
// PRIVATE FUNCTIONS
//
function __separateDecimalsForAlignment(value) {

    var valueFixed = value.toFixed(2);
    var [whole, decimals] = value.toString().split('.');
    
    var hiddenDecimals;
    var shownDecimals;

    if (!decimals) {
        shownDecimals = '';
        hiddenDecimals = '.00';
        
    } else if (decimals.length == 1) {
        shownDecimals = '.' + decimals;
        hiddenDecimals = '0';
    } else if (decimals.length == 2)  {
        shownDecimals = '.' + decimals;
        hiddenDecimals = '';
    } else  {
        var valueFixed = value.toFixed(2); 
        [, decimals] = valueFixed.toString().split('.');
        shownDecimals = '.' + decimals;
        hiddenDecimals = '';
    }
    return [ whole.toString() + shownDecimals , m('span', { class:'decimals-hidden' }, hiddenDecimals)]
}