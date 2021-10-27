import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Authors from './Authors';
import { ALL_AUTHORS } from '../../queries';

const mocks = [
    {
        request: {
            query: ALL_AUTHORS
        },
        result: {
            data: {
                author: { name: 'Michael Scott', born: 1999, bookCount: 1 }
            }
        }
    }
];

it('single author renders on table', () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Authors />
        </MockedProvider>
    );
});
