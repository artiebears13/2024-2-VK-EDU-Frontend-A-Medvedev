import CloseIcon from '@mui/icons-material/Close';
import './AlertMessage.scss'
import {useContext} from "react";
import {ErrorContext} from "../../context/ErrorContext.jsx";

export const AlertMessage = () => {
    const {error, setError} = useContext(ErrorContext)

    return (
        <div className='alert-container slide-in-top'>
            <button
                className='alert-close-button'
                onClick={() => setError('')}
            >
                <CloseIcon className="white" fontSize={"small"}/>
            </button>
            <h1 className='alert-header'>Oops...</h1>
            <div className='alert-text'>
                {error}
            </div>
        </div>
    )
}