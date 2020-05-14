import React from 'react'

const Card = ({person}) => {
    return (
        <div>
            <h2>{person.name}</h2>
            <img
            src={person.img_src}
            alt="avatar_img"
            />
            <p>{person.number}</p>
            <p>{person.email}</p>
        </div>
    )
}

export default Card