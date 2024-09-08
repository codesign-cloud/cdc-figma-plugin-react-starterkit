import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

export type FigmaMessage<T = unknown | any> = {
    type: string;
    message?: string;
    data?: T;
    [key: string]: unknown;
};

type FigmaMessageHandler = (message: FigmaMessage) => void;

export type UseFigmaMessageOptions = {
    /**
     * The target origin for postMessage. 
     * Defaults to 'https://www.figma.com'.
     * Use '*' for local testing, but be aware it's less secure.
     */
    targetOrigin?: string;
    /**
     * The debounce time in milliseconds for sending messages to Figma.
     * Defaults to 300ms to prevent spamming Figma with messages.
     */
    debounceMs?: number;
};

export function useFigmaMessaging(options: UseFigmaMessageOptions = {}) {

    const { targetOrigin = 'https://www.figma.com', debounceMs = 300 } = options;
    const [isRunningInFigma, setIsRunningInFigma] = useState(false);

    useEffect(() => {
        const isRunningInFigma = window.parent !== window;
        setIsRunningInFigma(isRunningInFigma);
        console.log(`Is running in Figma: ${isRunningInFigma}`);
    }, []);

    const sendToFigma = useCallback(
        debounce((message: FigmaMessage) => {
            if (!isRunningInFigma) {
                console.warn('Not in Figma environment');
                return;
            }
            try {
                parent.postMessage({ pluginMessage: message }, targetOrigin);
            } catch (error) {
                console.error('Failed to send message to Figma:', error);
            }
        }, debounceMs),
        [isRunningInFigma, targetOrigin, debounceMs]
    );

    const onFigmaMessage = useCallback((handler: FigmaMessageHandler) => {
        const onMessage = (event: MessageEvent) => {
            if (targetOrigin !== '*' && event.origin !== targetOrigin) {
                return;
            }
            const message = event.data.pluginMessage as FigmaMessage;
            if (message && typeof message === 'object' && 'type' in message) {
                handler(message);
            } else {
                console.warn('Received invalid message from Figma');
            }
        };

        window.addEventListener('message', onMessage);

        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, [isRunningInFigma, targetOrigin]);

    return { sendToFigma, onFigmaMessage, isRunningInFigma };
}
