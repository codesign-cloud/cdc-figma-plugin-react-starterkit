'use client';
import React from 'react';

export default function SelectionChanges({ sendToFigma, figmaSelectedNodeCount: fsnc }: { sendToFigma: (message: any) => void, figmaSelectedNodeCount: number }) {
    return (
        <div>
            <h3 className="text-xl font-bold">Inter-process communication</h3>
            <p className='text-xs text-gray-500 py-2'>Nodes selected in Figma: {fsnc}</p>
            <button onClick={() => sendToFigma({ type: 'get-selection-contents-deep' })} type="button"
            className='text-sm text-white py-1 px-3 rounded-sm bg-blue-500 hover:bg-blue-700'>
                Get frame contents
            </button>
        </div>
    );

}