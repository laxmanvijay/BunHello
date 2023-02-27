import React from 'react';
import useSWR from 'swr'
import { API_PATH } from '../constants';
import { INote } from '../types';

export const ListNotes = () => {

    const { data, error, isLoading}: {data: INote[], error: any, isLoading: Boolean} = useSWR(`${API_PATH}/`, (url) => fetch(url).then((res) => res.json()));

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>error occurred</p>}
            {!isLoading && !error && data.length > 0 && <ul>
                    {data.map(note => <li>{note.content}</li>)}
            </ul>}
            {!isLoading && !error && data.length === 0 && <p>No data present</p>}
        </>
    );
}