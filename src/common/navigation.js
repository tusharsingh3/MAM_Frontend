import React from 'react';
import List from 'devextreme-react/list.js';
import { useNavigate } from 'react-router-dom';
import { menuOptions } from './index';

const NavigationList = () => {
    const navigate = useNavigate();
    return (
        <div className="list" style={{ width: '200px' }}>
            <List
                dataSource={menuOptions}
                hoverStateEnabled={false}
                activeStateEnabled={false}
                focusStateEnabled={false}
                onItemClick={(e) => navigate(e.url)}
                className="panel-list dx-theme-accent-as-background-color" />
        </div>
    );
}

export default NavigationList;