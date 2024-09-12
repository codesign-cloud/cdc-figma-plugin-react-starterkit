'use client';

import React, { useState, useEffect } from 'react';
import { useFigmaMessaging } from '../hooks/useFigmaMessaging';

export default function SelectionChanges() {

    const [figmaSelectedNodes, setFigmaSelectedNodes] = useState([0]);

    const { onFigmaMessage } = useFigmaMessaging({
        targetOrigin: 'https://www.figma.com', // * for local testing, less secure
        debounceMs: 300, // 300ms debounce to prevent spamming Figma with messages
    });

    useEffect(() => {
        const removeMessageListener = onFigmaMessage((m) => {
            switch (m.type) {
                case 'selectionchange':
                    console.log(`Figma says: ${m.message}`);
                    console.log(`Figma payload: ${JSON.stringify(m.data ?? {})}`);
                    setFigmaSelectedNodes(m.data?.count ?? 0);
                    break;
                default:
                    console.log(`Unknown message type received from Figma: ${m.type}`);
            }
        });

        return removeMessageListener;
    }, [onFigmaMessage]);

    return(
        <div>
            <h3 className="text-xl font-bold">Inter-process communication</h3>
            <p className='text-xs text-gray-500'>Nodes selected in Figma: {figmaSelectedNodes}</p>
        </div>
    );

}