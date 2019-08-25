import m from 'mithril';


function TextField() {
    return {
        view(vnode) {
            var { label, value, name, className, type, onChange, min, max} = vnode.attrs;
            return m('.text-field', {
                    class: className,
                },
                m('label.text-field-label', label),
                m('input.text-field-value', {
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

export default TextField;