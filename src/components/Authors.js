import React, { useState } from 'react';
import Select from 'react-select';
import './Authors.css';
import { useMutation } from '@apollo/client';

import { ALL_AUTHORS, ADD_BORN } from '../queries';

const Authors = ({ authors, show }) => {
    const [name, setName] = useState(null);
    const [born, setBorn] = useState('');

    const [addBorn] = useMutation(ADD_BORN, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    });

    const submit = async event => {
        event.preventDefault();

        addBorn({ variables: { name, born } });

        setName(null);
        setBorn('');
    };
    if (!show) {
        return null;
    }

    // const authors = result.data.allAuthors

    const options = authors.map(a => {
        return { value: a.name, label: a.name };
    });

    return (
        <div className='container-authors'>
            <div className='authors'>
                <h2 className='authors_title'>authors</h2>
                <table className='authors_table'>
                    <thead>
                        <tr>
                            <th scope='col'>name</th>
                            <th scope='col'>born</th>
                            <th scope='col'>books</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.map(a => (
                            <tr key={a.name}>
                                <th scope='row'>{a.name}</th>
                                <td>{a.born}</td>
                                <td>{a.bookCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='birthyear'>
                <h3 className='birthyear_title'>Update Birth Year</h3>
                <form className='birthyear_form' onSubmit={submit}>
                    <p className='birthyear_input_text'>name</p>
                    <Select
                        className='birthyear_select'
                        defaultValue={name}
                        onChange={target => setName(target.value)}
                        options={options}
                    />
                    <p className='birthyear_input_text'>born</p>
                    <input value={born} onChange={({ target }) => setBorn(Number(target.value))} />
                    <button type='submit'>add</button>
                </form>
            </div>
        </div>
    );
};

export default Authors;
