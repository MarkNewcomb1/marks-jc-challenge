import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../services/userService';

function List({ match }) {
    const { path } = match;
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(response => setUsers(response.results));
    }, []);

    function deleteUser(id) {
        setUsers(users.map(user => {
            if (user.id === id) { user.isDeleting = true; }
            return user;
        }));
        userService.delete(id).then(() => {
            setUsers(users => users.filter(user => user.id !== id));
        });
    }

    return (
        <div>
            {/* <p>{JSON.stringify(data)}</p> */}
            <h1>Users</h1>
            <Link to='/add' className="btn btn-sm btn-success mb-2">Add User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Username</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.firstname} {user.lastname}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users. Add Some!</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export { List };