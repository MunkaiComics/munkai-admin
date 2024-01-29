import React from 'react'
import './user-info.scss'

const UserInfo = ({ user }) => {
    console.log(user);
    return (
        <div className='user-info'>
            <div className="user-info__name">
               <p>Welcome <span>{user?.first_name} {user?.last_name}</span></p>
            </div>
        </div>
    )
}

export default UserInfo
