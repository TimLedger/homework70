import { NavLink } from 'react-router-dom';
import './Toolbar.css';

const Toolbar = () => {
    return (
        <nav className='main-nav'>
            <ul>
                <li>
                    <NavLink to={'/new-contact'} className={({ isActive }) => isActive ? 'active-link' : 'link'}>Добавить контакт</NavLink>
                </li>
            </ul>                       
        </nav>
    );
}

export default Toolbar;