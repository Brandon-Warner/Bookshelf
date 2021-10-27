import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Authors from './Authors';
import { ALL_AUTHORS } from '../../queries';

describe('Authors', () => {
    it('multiple authors render on page', () => {
        const mocks = [
            {
                request: {
                    query: ALL_AUTHORS
                },
                result: {
                    data: {
                        allAuthors: [
                            {
                                name: 'Michael Scott',
                                born: 1999,
                                bookCount: 1
                            },
                            {
                                name: 'Earnest Hemmingway',
                                born: 1899,
                                bookCount: 2
                            },
                            {
                                name: 'Mark Twain',
                                born: 1835,
                                bookCount: 3
                            },
                            {
                                name: 'Agatha Christie',
                                born: 1890,
                                bookCount: 4
                            }
                        ]
                    }
                }
            }
        ];

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Authors />
            </MockedProvider>
        );
    });

});
