'use client';

import React, { useState } from 'react';

import { useFigmaMessaging } from '../hooks/useFigmaMessaging';
import axiosClient from '../utils/axiosClient';

export default function AsyncFetchQuoteHttp() {

    const [isLoading, setIsLoading] = useState(false);
    const [quote, setQuote] = useState('');

    const { sendToFigma } = useFigmaMessaging({
        targetOrigin: 'https://www.figma.com', // * for local testing, less secure
        debounceMs: 300, // 300ms debounce to prevent spamming Figma with messages
    });

    const fetchQuote = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.get('https://dummyjson.com/quotes/random');
            const data = response.data;
            const randomQuote = data.quote + ' - ' + data.author;
            setQuote(randomQuote);
            sendToFigma({ type: 'demo-insert-quote', quote: randomQuote });
        } catch (error) {
            console.error('Error fetching quote:', error);
        } finally {
            setTimeout(() => { setIsLoading(false); }, 750);
        }
    };

    return (
        <div>
            <h3 className="text-xl font-bold">Fetch quote via HTTP</h3>
            <p className="text-xs text-gray-500 pt-0 pb-2">Retrieves a random quote from <a className='text-blue-400' rel="external nofollow noopener" href="https://dummyjson.com/quotes/" target="_blank">dummyjson.com</a> and inserts it into Figma</p>
            <button onClick={fetchQuote} type="button" disabled={isLoading} className={`text-sm text-white py-1 px-3 rounded-sm ${isLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'}`}>
                {isLoading ? 'Fetching...' : 'Fetch and insert'}
            </button>
            { quote &&
                <blockquote className="text-gray-500 mt-3 text-sm border-l-4 border-blue-500 pl-4 py-2 rounded-lg">{quote}</blockquote>
            }
        </div>
    );
}