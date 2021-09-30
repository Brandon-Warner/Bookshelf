import React, { useState } from 'react';
import Select from 'react-select';
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
            <div>
                <h2>authors</h2>
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>born</th>
                            <th>books</th>
                        </tr>
                        {authors.map(a => (
                            <tr key={a.name}>
                                <td>{a.name}</td>
                                <td>{a.born}</td>
                                <td>{a.bookCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h3>Set Birth Year</h3>
                <form onSubmit={submit}>
                    name
                    <Select
                        defaultValue={name}
                        onChange={target => setName(target.value)}
                        options={options}
                    />
                    born
                    <input value={born} onChange={({ target }) => setBorn(Number(target.value))} />
                    <button type='submit'>add</button>
                </form>
            </div>
        </div>
    );
};

export default Authors;
