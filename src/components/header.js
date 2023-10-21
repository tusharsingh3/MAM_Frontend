import React, { useState, useEffect } from 'react';
import { menuOptions } from '../common';
import TabPanel from 'devextreme-react/tab-panel';
import { useNavigate } from 'react-router-dom';

function Header(props) {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const menu = [...menuOptions];

    const onSelectionChanged = (args) => {
        if (args.name === 'selectedIndex') {
            const urlToRedirect = menu.find(ele => ele.ID === args.value)?.url;
            if (urlToRedirect === 'logout') {
                //logout current user here.
            } else {
                setSelectedIndex(args.value);
                navigate(urlToRedirect);
            }
        }
    };

    const itemTitleRender = (menuItem) => {
        return <span>{menuItem.name}</span>;
    };

    useEffect(() => {
        const pathName = window.location.pathname;
        let activeTabIndex = 0;
        if (pathName) {
            activeTabIndex = menu.find(ele => ele.url === pathName)?.ID;
            setSelectedIndex(activeTabIndex);
        }
    }, []);

    return (
        <div>
            <div id="container">
                <TabPanel
                    dataSource={menu}
                    selectedIndex={selectedIndex}
                    onOptionChanged={onSelectionChanged}
                    loop={false}
                    itemTitleRender={itemTitleRender}
                    animationEnabled={true}
                    swipeEnabled={true}
                />
            </div>
        </div>
    );
}

export default Header;