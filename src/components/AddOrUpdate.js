import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { superstructResolver } from '@hookform/resolvers/superstruct';
import { struct } from 'superstruct';

function AddOrUpdate({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const schema = struct({
        firstname: 'string',
        lastname: 'string',
        username: 'string',
        email: 'string'
    });

    function onSubmit(data) {
        return isAddMode
            ? console.log(data)
            : console.log(data);
    }

    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: superstructResolver(schema)
    });


    // https://github.com/react-hook-form/resolvers look at superstruct
    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>First Name</label>
                    <input name="firstname" type="text" ref={register} className="form-control" />
                </div>
                <div className="form-group col-5">
                    <label>Last Name</label>
                    <input name="lastname" type="text" ref={register} className="form-control" />
                </div>
                <div className="form-group col-5">
                    <label>Username</label>
                    <input name="username" type="text" ref={register} className="form-control" />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-7">
                    <label>Email</label>
                    <input name="email" type="text" ref={register} className="form-control" />
                </div>
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-primary">Save</button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    )
}

export { AddOrUpdate };