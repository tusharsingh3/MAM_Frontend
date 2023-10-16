import React from 'react';
import Menu, { Item } from 'devextreme-react/menu';

function Header() {
    return (
        <div>
            <div id="container">
                <Menu>
                    <Item icon='home' url='/' />
                    <Item icon='login' url='/login' />
                    <Item text="Contact" url='/contact' />
                </Menu>
            </div>
        </div>
    );
}

export default Header;