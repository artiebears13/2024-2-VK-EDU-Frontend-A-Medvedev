import AddIcon from '@mui/icons-material/Add';
import './createChatButton.scss'


export const CreateChatButton = ({openCreateChatModal}) => {
    return (
        <button className='create-chat-button' onClick={openCreateChatModal}>
            <div className='create-chat-button__content'>
                <AddIcon/>
            </div>
        </button>
    )
}