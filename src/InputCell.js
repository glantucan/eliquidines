import m from 'mithril';



function InputCell() {

    return {
        view(vnode) {
            var { label, value, name, className, type, onChange, min, max} = vnode.attrs;

            return m('.input-cell', {
                    class: className,
                },
                m('input.input-cell-value', {
                    type: type || 'text',
                    name: name, 
                    value: value,
                    min, max,
                    oninput(e) {
                        onChange(e.target.value)
                    }
                })
            );
        }
    }
}

export default InputCell;