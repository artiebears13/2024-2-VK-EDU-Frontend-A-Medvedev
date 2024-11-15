import classes from './RecommendedUser.module.scss'
import {ChatPhoto} from "../../ChatItem/ChatPhoto.jsx";

export const RecommendedUser = ({users, createChat, chosen}) => {
    return (
        <div className={classes.RecommendedUserContainer}>
            {users.map(user => {
                return(
                    <div
                        className={`${classes.RecommendedUserItem} ${chosen && chosen.includes(user.id) && classes.chosen}`}
                        key={user.id}
                        onClick={() => createChat(user)}
                    >
                        <ChatPhoto person={user}/>
                        {user.first_name} {user.last_name}
                    </div>)
            })}
        </div>
    )
}