import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { superstructResolver } from '@hookform/resolvers/superstruct';
import { define } from 'superstruct';
import '../App.css';

import { userService } from '../services/userService';

function AddOrUpdate({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const schema = define({
        firstname: 'string',
        lastname: 'string',
        username: 'string',
        email: 'string'
    });

    const { register, handleSubmit, reset, setValue, formState } = useForm({
        resolver: superstructResolver(schema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(id, data);
    }

    function createUser(data) {
        return userService.create(data)
            .then(() => {
                history.push('.');
            })
    }

    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                history.push('..');
            })
    }

    const [user, setUser] = useState({});

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            userService.getById(id).then(user => {
                const fields = ['firstname', 'lastname', 'username', 'email'];
                fields.forEach(field => setValue(field, user[field]));
                setUser(user);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>First Name</label>
                    <input name="firstname" type="text" ref={register} className="form-control" required />
                </div>
                <div className="form-group col-5">
                    <label>Last Name</label>
                    <input name="lastname" type="text" ref={register} className="form-control" required />
                </div>
                <div className="form-group col-5">
                    <label>Username <span className="text-muted">username must start with a letter, be 30 characters or less, and contain only valid Unix Characters (letters, numbers, '-', '.', and '_')</span></label>
                    <input name="username" type="text" ref={register} className="form-control" required />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-7">
                    <label>Email</label>
                    <input name="email" type="text" ref={register} className="form-control" required />
                </div>
            </div>

            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    )
}

export { AddOrUpdate };