
import React from 'react';
import { Message } from '../types';
import MarkdownRenderer from './MarkdownRenderer';

interface ChatBubbleProps {
  message: Message;
}

const DocumentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);


const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const bubbleClasses = isUser
    ? 'bg-primary text-white'
    : 'bg-white text-neutral-dark border';
  
  const wrapperClasses = `flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`;

  const renderContent = () => {
    if (message.file) {
        if (message.file.type.startsWith('image/')) {
            return (
                <div>
                    <img src={message.file.url} alt={message.file.name} className="max-w-xs rounded-lg mb-2 border border-gray-200" />
                    <p>{message.text}</p>
                </div>
            );
        }
        return (
            <div className="flex items-center gap-2 p-2 bg-white/20 rounded-lg">
                <DocumentIcon className="w-6 h-6" />
                <p className="font-medium">{message.text}</p>
            </div>
        )
    }
    
    if (isUser || typeof message.text !== 'string') {
      return message.text;
    }
    return <MarkdownRenderer content={message.text} />;
  }

  return (
    <div className={wrapperClasses}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">
          AI
        </div>
      )}
      <div className={`max-w-md md:max-w-lg lg:max-w-xl p-3 rounded-xl shadow-md animate-slide-in ${bubbleClasses}`}>
        <div className="text-sm md:text-base">
          {renderContent()}
        </div>
        <span className={`text-xs block mt-1 ${isUser ? 'text-blue-200' : 'text-gray-400'} text-right`}>
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;
