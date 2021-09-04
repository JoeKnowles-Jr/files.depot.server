import React from 'react';
import styled from 'styled-components';


const UserStats = ({ users }) => {
    const numUsers = users.length;
    const numAdmins = users.filter(u => u.role === 'Admin').length;

    return (
        <SStats>
            <div>
                <h4>Total Users: </h4>
                <span>{numUsers}</span>
            </div>
            <div>
                <h4>Total Admins: </h4>
                <span>{numAdmins}</span>
            </div>
        </SStats>
    );
};

export const SStats = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 90%;
    margin: auto;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: #333;
    h4 {
        margin: 0;
        padding:0;
        display: inline-block;
    }
    span {
        padding: 0 0 0 5px;
    }
`;

export default UserStats;