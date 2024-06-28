import React, { useRef } from 'react';
import { TabMenu  } from 'primereact/tabmenu';
import { useNavigate  } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();

    const items = [
        {label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'},
        {label: 'Producto', icon: 'pi pi-fw pi-calendar', to: '/product'},
        {label: 'Orden', icon: 'pi pi-fw pi-pencil', to: '/order'},
        {label: 'LogOut', icon: 'pi pi-fw pi-user-minus', to: '/logout'},
    ];
    
    return (
        <div className='Menu'>
            <TabMenu model={items} onTabChange={(e) => {
                navigate(e.value.to);    
            }}/>
        </div>
    );
};

export default Menu;