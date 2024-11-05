import classes from './PersonNotFoundBadge.module.scss'

export const PersonNotFoundBadge = () => {
    return (
        <div className={classes.personNotFoundContainer}>
            <div className={classes.personNotFoundBadge} >
                <h2>Пользователь не найден</h2>
                <p className={classes.personNotFoundBadgeBody}>
                    Проверьте id
                </p>
            </div>
        </div>
    )
}