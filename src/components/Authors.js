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
        <div>
            <div className='table'>
                <h2 className='table_title'>authors</h2>
                <table className='table_table'>
                    <tbody className='table_body'>
                        <tr className='table_headers'>
                            <th>name</th>
                            <th>born</th>
                            <th>books</th>
                        </tr>
                        {authors.map(a => (
                            <tr key={a.name} className='table_data'>
                                <td>{a.name}</td>
                                <td>{a.born}</td>
                                <td>{a.bookCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='birthyear'>
                <h3 className='birthyear_title'>Set Birth Year</h3>
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
