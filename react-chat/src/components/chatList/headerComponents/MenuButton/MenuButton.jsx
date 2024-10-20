import MenuIcon from '@mui/icons-material/Menu';
import './menuButton.scss'

// burger button
export const MenuButton = ({toggleMenu}) => {
    return (
        <MenuIcon className={"white menu-button"} onClick={toggleMenu}></MenuIcon>
    )
}