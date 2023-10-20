import React from 'react';
import Menu, { Item } from 'devextreme-react/menu';
import { menuOptions } from '../common';

function Header(props) {
    const { isLoggedIn = true } = props;
    return (
        <div>
            <div id="container">
                <Menu>
                    {menuOptions.map(menu => {
                        return (
                            <Item icon={menu.icon} url={menu.url} key={menu.id} />
                        )
                    })}
                </Menu>
            </div>
        </div>
    );
}

export default Header;