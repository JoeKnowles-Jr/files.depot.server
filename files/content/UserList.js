import React, { useEffect } from "react";
import { loadUsers } from '../actions/usersAction';
import { useDispatch, useSelector } from "react-redux";
import UserStats from './UserStats';
import User from './User';

const UserList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUsers());
    }, [dispatch]);
    const { users } = useSelector(state => state.users);
    return (
        <div>
            <UserStats users={users} />
            {users && (users.map((u) => {return (<User key={u._id} user={u} />)}))}
        </div>
    );
}

export default UserList;