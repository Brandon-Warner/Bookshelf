import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './Authors.css';
import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, ADD_BORN } from '../../queries';

const Authors = ({ show, addNotification }) => {
    const [authors, setAuthors] = useState([]);
    const [name, setName] = useState(null);
    const [born, setBorn] = useState(0);
    const result = useQuery(ALL_AUTHORS);
    const [addBorn] = useMutation(ADD_BORN, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: () =>
            addNotification('Error setting birth year, must be LOGGED IN to update data', 'error'),
        onCompleted: () => addNotification(`Updated birthyear`, 'success')
    });

    useEffect(() => {
        if (result.data) {
            setAuthors(result.data.allAuthors);
        }
    }, [result.data]);

    const bornValidation = born => {
        console.log('isNaN ? :', isNaN(born));
        if (isNaN(born) || born === '') {
            return false;
        }
        return true;
    };

    const submit = async event => {
        event.preventDefault();
        console.log('is born validated ? : ', bornValidation(born));
        if (!bornValidation(born)) {
            addNotification('Please enter born as a Number!', 'error');
        } else {
            console.log('born: ', born);
            const bornAsNumber = Number(born);
            console.log('bornAsNumber: ', bornAsNumber);
            console.log('name: ', name);
            addBorn({ variables: { name, bornAsNumber } });
        }

        setName(null);
        setBorn(0);
    };

    if (!show) {
        return null;
    }
    const options = authors.map(a => {
        return { value: a.name, label: a.name };
    });

    return (
        <div className='container-authors'>
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
                    <p className='birthyear_input_text'>birthyear</p>
                    <input
                        className='birthyear_input_content'
                        value={born}
                        type='number'
                        onChange={({ target }) => setBorn(target.value)}
                    />
                    <button className='birthyear_form__button' type='submit'>
                        add
                    </button>
                </form>
            </div>
            <div className='authors'>
                <h2 className='authors_title'>authors</h2>
                <table className='authors_table'>
                    <thead className='authors_table__headers'>
                        <tr>
                            <th scope='col'>name</th>
                            <th scope='col'>born</th>
                            <th scope='col'>books</th>
                        </tr>
                    </thead>
                    <tbody className='authors_table__body'>
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
        </div>
    );
};

export default Authors;
