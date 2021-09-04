import React from 'react';
import history from '../history';
import styled from 'styled-components';
import { deleteUser } from '../Repository';
import edit_icon from '../img/ico_edit.png';

const User = ({ user, hideButtons }) => {
    const [_user, set_User] = React.useState();

    React.useEffect(() => {
        set_User(user);
    }, [user]);

    const performDelete = async (e) => {
        e.preventDefault();
        await deleteUser(user._id);
        window.location.reload();
    };

    const performEdit = (e) => {
        e.preventDefault();
        const dest = `/userDetails/${user._id}`;
        history.push(dest);
    };

    const StyledUser = user.role === 'Admin' ? SAdmin : SUser;
    return (
        <StyledUser>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
            
            {(!hideButtons) &&
                <div>
                    <EditButton onClick={performEdit}><img src={edit_icon} alt='icon' /></EditButton>
                    <DeleteButton onClick={performDelete}>X</DeleteButton>
                </div>}
        </StyledUser>
    );
};

const BaseUser = styled.div`

    position: relative;
    padding: 0.5rem 1rem;
    margin: 1rem;
    border-radius: 0.5rem;
`;

const SAdmin = styled(BaseUser)`

    background-color: #555;
    border: 1px solid #23d997;
`;

const SUser = styled(BaseUser)`
    background-color: #aaa;
`;

const DeleteButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
`;

const EditButton = styled.button`
    position: absolute;
    padding: 0;
    bottom: 0;
    right: 0;
    height: 23px;
    width: 23px;
    img {
        width: 100%;
        height: 100%;
    }
`;

export default User;

