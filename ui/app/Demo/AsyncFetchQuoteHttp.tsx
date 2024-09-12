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
            <p>Fetches a random quote asynchronously from dummyjson.com and inserts it to Figma</p>
            <button onClick={fetchQuote} type="button" disabled={isLoading}>
                {isLoading ? 'Fetching...' : 'Fetch and insert'}
            </button>
            <blockquote>{quote}</blockquote>
        </div>
    );
}