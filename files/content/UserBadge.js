import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const UserBadge = ({ user, logout, profile }) => {
    const [initials, setInitials] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [menuShowing, setMenuShowing] = useState(false);


    useEffect(() => {
        if (user.role === 'Admin')
            setIsAdmin(true);
        console.log(user);
        setInitials(user.firstName.toUpperCase()[0] + user.lastName.toUpperCase()[0]);
    }, [user]);

    const InitialsWrapper = (isAdmin) ? AdminInitials : UserInitials;

    const badgeClick = () => {
        setMenuShowing(!menuShowing);
    };

    return (
        <div onClick={badgeClick}>
            <BadgeWrapper>
                {(!menuShowing) && <InitialsWrapper>{initials}</InitialsWrapper>}
                {menuShowing &&
                    <MenuWrapper>
                        <div onClick={profile} className='menubutton upper'>Profile</div>
                        <div onClick={logout} className='menubutton lower'>Logout</div>
                    </MenuWrapper>
                }
            </BadgeWrapper>
        </div>
    );
};

const MenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    .menubutton {
        background-color: #aaa;
        color: #00a;
    }
    .upper {
        padding: 1rem 1rem 0;
    }
    .lower {
        padding: 0 1rem 1rem;
    }
    .upper:hover {
        color: #0a0;
        background-color: #333;
    }
    .lower:hover {
        color: #333;
        background-color: #0a0;
    }
`;

const BadgeWrapper = styled.div`
    width: 5rem;
    height: 5rem;
    background-color: #333;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    overflow: hidden;
`;

const AdminInitials = styled.h1`
    color: #fff;
`;

const UserInitials = styled.h1`
    color: #000;
`;

export default UserBadge;