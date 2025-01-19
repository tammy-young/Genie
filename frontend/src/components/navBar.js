import NumbersIcon from '@mui/icons-material/Numbers';
import { NavLink, useLocation } from 'react-router-dom';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ChairIcon from '@mui/icons-material/Chair';

import GenieIcon from './images/genieLogo.js';
import constants from '../constants.js';
import "../App.css";


const NavBar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    }

    return (
        <div className='nav-bar flex flex-col sm:flex-row space-y-3 sm:space-y-0'>
            <div className='col flex flex-row justify-center sm:justify-start p-0'>
                <NavLink to={constants.paths.FASHION}>
                    <GenieIcon />
                </NavLink>
            </div>
            <div className='flex w-full justify-center space-x-3'>
                <div className='col nav' style={{ display: 'flex', alignItems: 'center', maxWidth: 'fit-content', paddingRight: '0px' }} >
                    <NavLink to={constants.paths.FASHION} className={"nav-link" + (isActive(constants.paths.FASHION) ? " fashion-selected" : "")} style={{ display: 'flex' }}>
                        <div>Fashion</div>
                        <div><CheckroomIcon /></div>
                    </NavLink>
                </div>
                <div className='col nav' style={{ display: 'flex', alignItems: 'center', maxWidth: 'fit-content', paddingRight: '0px' }} >
                    <NavLink to={constants.paths.INTERIOR} className={"nav-link" + (isActive(constants.paths.INTERIOR) ? " interior-selected" : "")} style={{ display: 'flex' }}>
                        <div>Interior</div>
                        <div><ChairIcon /></div>
                    </NavLink>
                </div>
                <div className='col nav' style={{ display: 'flex', alignItems: 'center', maxWidth: 'fit-content' }} >
                    <NavLink to={constants.paths.ID_SEARCH} className={"nav-link" + (isActive(constants.paths.ID_SEARCH) ? " selected" : "")} style={{ display: 'flex' }}>
                        Brands <div><NumbersIcon /></div>
                    </NavLink>
                </div>
            </div>
            <div className='col'></div>
        </div>
    )
}

export default NavBar;
