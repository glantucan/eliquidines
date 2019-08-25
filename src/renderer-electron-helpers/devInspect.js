function activateContextmenu() {

    var { remote } = window.require('electron');
    var { Menu, MenuItem } =  remote;


    var rightClickPosition = null;

    var menu = new Menu();
    var menuItem = new MenuItem({
        label: 'Inspect Element',
        click: () => {
        remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
        }
    });
    menu.append(menuItem);

    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        rightClickPosition = {x: e.x, y: e.y};
        menu.popup(remote.getCurrentWindow());
    }, false);

}


export default activateContextmenu;