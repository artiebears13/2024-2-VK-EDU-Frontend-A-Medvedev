import classes from './Avatar.module.scss';
import React from "react";
import {imgOrPlaceholder} from "../../utils/imgOrPlaceholder/imgOrPlaceholder.js";

export const Avatar = ({src}) => {

    const handledSrc = imgOrPlaceholder(src);
    return (
        <div className={classes.AvatarContainer}>
            <img src={handledSrc} alt={"avatar"} className={classes.AvatarImage}/>
        </div>
    )
}