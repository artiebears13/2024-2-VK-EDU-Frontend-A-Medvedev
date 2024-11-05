import AddIcon from '@mui/icons-material/Add';
import styles from './createChatButton.module.scss';

export const CreateChatButton = ({openCreateChatModal}) => {
    return (
        <button className={styles.createChatButton} onClick={openCreateChatModal}>
            <div className={styles.createChatButtonContent}>
                <AddIcon/>
            </div>
        </button>
    );
};
