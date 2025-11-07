
import React from 'react';

// A simple function to parse bold text
const parseInlineFormatting = (text: string): React.ReactNode[] => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.filter(part => part).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.substring(2, part.length - 2)}</strong>;
        }
        return part;
    });
};

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: 'ul' | 'ol' | null = null;
    let listItems: React.ReactNode[] = [];

    const flushList = () => {
        if (listItems.length > 0) {
            const key = `list-${elements.length}`;
            if (currentList === 'ul') {
                elements.push(<ul key={key} className="list-disc list-outside space-y-1 my-2 pl-6">{listItems}</ul>);
            } else if (currentList === 'ol') {
                elements.push(<ol key={key} className="list-decimal list-outside space-y-1 my-2 pl-6">{listItems}</ol>);
            }
            listItems = [];
            currentList = null;
        }
    };

    lines.forEach((line, index) => {
        const key = `line-${index}`;
        
        // Using a clear hierarchy of font sizes and weights for headings.
        // Parsing from most specific (######) to least specific (#).
        if (line.startsWith('###### ')) {
            flushList();
            elements.push(<h6 key={key} className="text-sm font-semibold mt-2 mb-1">{parseInlineFormatting(line.substring(7))}</h6>);
        } else if (line.startsWith('##### ')) {
            flushList();
            elements.push(<h5 key={key} className="text-base font-semibold mt-2 mb-1">{parseInlineFormatting(line.substring(6))}</h5>);
        } else if (line.startsWith('#### ')) {
            flushList();
            elements.push(<h4 key={key} className="text-lg font-semibold mt-3 mb-1">{parseInlineFormatting(line.substring(5))}</h4>);
        } else if (line.startsWith('### ')) {
            flushList();
            elements.push(<h3 key={key} className="text-xl font-bold mt-4 mb-2">{parseInlineFormatting(line.substring(4))}</h3>);
        } else if (line.startsWith('## ')) {
            flushList();
            elements.push(<h2 key={key} className="text-2xl font-bold mt-5 mb-2 border-b pb-1">{parseInlineFormatting(line.substring(3))}</h2>);
        } else if (line.startsWith('# ')) {
            flushList();
            elements.push(<h1 key={key} className="text-3xl font-bold mt-6 mb-3 border-b pb-2">{parseInlineFormatting(line.substring(2))}</h1>);
        } else if (line.match(/^---/)) {
            flushList();
            elements.push(<hr key={key} className="my-4 border-gray-300" />);
        } else if (line.match(/^\s*[\*\-]\s/)) { // More robust unordered list detection to handle indentation and remove asterisks.
            if (currentList !== 'ul') {
                flushList();
                currentList = 'ul';
            }
            listItems.push(<li key={key}>{parseInlineFormatting(line.replace(/^\s*[\*\-]\s/, ''))}</li>);
        } else if (line.match(/^\s*\d+\.\s/)) { // More robust ordered list detection.
            if (currentList !== 'ol') {
                flushList();
                currentList = 'ol';
            }
            listItems.push(<li key={key}>{parseInlineFormatting(line.replace(/^\s*\d+\.\s/, ''))}</li>);
        } else if (line.trim() === '') {
            flushList();
            // Treat empty lines as separators; don't render them.
        } else {
            flushList();
            elements.push(<p key={key} className="my-2">{parseInlineFormatting(line)}</p>);
        }
    });

    flushList();

    return <div className="max-w-none text-inherit">{elements}</div>;
};

export default MarkdownRenderer;
