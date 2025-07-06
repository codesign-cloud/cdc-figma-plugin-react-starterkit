import { useState } from 'react';
import axiosClient from '../utils/axiosClient';

export default function AsyncFetchQuoteHttp({ sendToFigma }: { sendToFigma: (message: any) => void }) {

    const [isLoading, setIsLoading] = useState(false);
    const [quote, setQuote] = useState('');

    const fetchQuote = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.get('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random'));
            // PS:redirection URL was suggested for CORS issues by Claude 4
            // ZenQuotes decode:
            const data = response.data?.contents??{};
            const dataJson = JSON.parse(data)[0] ?? {};
            console.log('Fetched data:', dataJson);
            const randomQuote = dataJson.q + ' - ' + dataJson.a;
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
            <h3 className="text-md font-bold">Fetch quote via HTTP</h3>
            <p className="text-xs text-gray-500 pt-0 pb-2">Retrieves a random quote asynchronously from <a className='text-blue-400' rel="external nofollow noopener" href="https://zenquotes.io/" target="_blank">zenquotes.io</a> and inserts it into Figma</p>
            <button onClick={fetchQuote} type="button" disabled={isLoading} className={`text-sm text-white py-1 px-3 rounded-sm ${isLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'}`}>
                {isLoading ? 'Fetching...' : 'Fetch and insert'}
            </button>
            {quote &&
                <blockquote className="text-gray-500 mt-3 text-xs border-l-4 border-blue-500 pl-4 py-2 rounded-lg">{quote}</blockquote>
            }
        </div>
    );
}