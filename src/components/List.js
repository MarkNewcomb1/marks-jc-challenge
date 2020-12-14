import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
function List() {

    const [data, setData] = useState([]);

    const fetchData = useCallback(() => {
        fetch('./fakeUsersPayload.json')
            .then(response => response.json())
            .then(results => {
                setData(results.results);
            })
    })

    useEffect(() => {
        fetchData();
    }, []);

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
                    {data && data.map(user =>
                        <tr key={user.id}>
                            <td>{user.firstname} {user.lastname}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button className="btn btn-sm btn-danger btn-delete-user"><span>Delete</span></button>
                            </td>
                        </tr>
                    )}
                    {!data &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {data && !data.length &&
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