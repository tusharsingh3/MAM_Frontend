import React, { useState, useEffect } from 'react';
import { menuOptions } from '../common';
import TabPanel from 'devextreme-react/tab-panel';
import ResponsiveBox, { Row, Col, Item, Location } from 'devextreme-react/responsive-box';
import DropDownButton from 'devextreme-react/drop-down-button';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo192.png';

const profileMenu = [
    { id: 1, text: 'Profile', icon: 'user' },
    { id: 4, text: 'Messages', icon: 'email' },
    { id: 3, text: 'Logout', icon: 'runner' }
];

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
        return <span>{menuItem.name}</span>
    };

    useEffect(() => {
        const pathName = window.location.pathname;
        let activeTabIndex = 0;
        if (pathName) {
            activeTabIndex = menu.find(ele => ele.url === pathName)?.ID;
            setSelectedIndex(activeTabIndex);
        }
    }, []);

    const onItemClick = (e) => {
        console.log('dropdown click', e.itemData.name || e.itemData);
    }

    const screen = (width) => {
        return (width < 700) ? 'sm' : 'lg';
    }

    return (
        <ResponsiveBox singleColumnScreen="sm" screenByWidth={screen} className='header-bg-red'>
            <Row ratio={1}></Row>

            <Col ratio={1}></Col>
            <Col ratio={2} screen="lg"></Col>
            <Col ratio={1}></Col>

            <Item>
                <Location
                    row={0}
                    col={1}
                    screen="lg"
                ></Location>
                <Location
                    row={0}
                    col={0}
                    colspan={2}
                    screen="sm"
                ></Location>
                <div className="content item header-bg-red">
                    <div>
                        <TabPanel
                            className='header-bg-red'
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
            </Item>
            <Item>
                <Location
                    row={0}
                    col={0}
                    screen="lg"
                ></Location>
                <Location
                    row={2}
                    col={0}
                    screen="sm"
                ></Location>
                <div className="left-side-bar item">
                    <div>
                        <img
                            src={logo}
                            alt="logo"
                            style={{ width: '20px', height: '20px' }}
                        />
                    </div>
                </div>
            </Item>
            <Item>
                <Location
                    row={0}
                    col={2}
                    screen="lg"
                ></Location>
                <Location
                    row={0}
                    col={1}
                    screen="sm"
                ></Location>
                <div className="right-side-bar item">
                    <div>
                        <DropDownButton
                            className='border-none'
                            text="Tushar Singh"
                            icon="user"
                            items={profileMenu}
                            onItemClick={onItemClick}
                        />
                    </div>
                </div>
            </Item>

        </ResponsiveBox>
    );
}

export default Header;