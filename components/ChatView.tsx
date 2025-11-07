import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from '../types';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';
import { sendMessageToAI, startChat } from '../services/geminiService';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';
import PlusIcon from './icons/PlusIcon';
import ImageIcon from './icons/ImageIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';

interface ChatViewProps {
  onConversationComplete: () => void;
  initialMessage?: string;
}

const ChatView: React.FC<ChatViewProps> = ({ onConversationComplete, initialMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadButtonRef = useRef<HTMLDivElement>(null);
  const initialMessageSent = useRef(false);

  useEffect(() => {
    startChat();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (uploadButtonRef.current && !uploadButtonRef.current.contains(event.target as Node)) {
        setShowUploadOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleSendMessage = useCallback(async (e: React.FormEvent, messageText?: string) => {
    e.preventDefault();
    const textToSend = messageText || userInput;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, userMessage]);
    if (!messageText) {
      setUserInput('');
    }

    setIsTyping(true);
    try {
      const aiResponseText = await sendMessageToAI(textToSend);
      
      let cleanText = aiResponseText;
      if (aiResponseText.includes('[CONVERSATION_COMPLETE]')) {
        cleanText = aiResponseText.replace('[CONVERSATION_COMPLETE]', '').trim();
        if (cleanText) {
             setTimeout(() => onConversationComplete(), 1500);
        } else {
            onConversationComplete();
        }
      }
      
      if(cleanText) {
          const aiMessage: Message = {
            id: Date.now() + 1,
            text: cleanText,
            sender: 'ai',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages(prev => [...prev, aiMessage]);
      }

    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [userInput, onConversationComplete]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const fileMessage: Message = {
            id: Date.now(),
            text: file.name,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            file: {
                name: file.name,
                url: e.target?.result as string,
                type: file.type,
            },
        };
        setMessages(prev => [...prev, fileMessage]);
    };
    reader.readAsDataURL(file);

    if (event.target) {
        event.target.value = '';
    }
  };

  const handleUploadClick = (type: 'image' | 'document') => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image' 
        ? 'image/*' 
        : 'application/pdf,.doc,.docx,.xls,.xlsx';
      fileInputRef.current.click();
    }
    setShowUploadOptions(false);
  };

  useEffect(() => {
    if (initialMessage && !initialMessageSent.current) {
      initialMessageSent.current = true;
      handleSendMessage({ preventDefault: () => {} } as React.FormEvent, initialMessage);
    }
  }, [initialMessage, handleSendMessage]);

  const ChatInputForm = (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSendMessage} className="relative">
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
        <div ref={uploadButtonRef} className="absolute left-2.5 top-1/2 -translate-y-1/2">
            <button
                type="button"
                onClick={() => setShowUploadOptions(prev => !prev)}
                className="p-2.5 text-gray-500 hover:text-primary rounded-lg transition-colors"
                aria-label="Attach file"
            >
                <PlusIcon className="w-5 h-5" />
            </button>
            {showUploadOptions && (
                <div className="absolute bottom-full mb-2 w-56 bg-white rounded-md shadow-lg border z-10 py-1">
                    <button
                        type="button"
                        onClick={() => handleUploadClick('image')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                    >
                        <ImageIcon className="w-5 h-5 text-gray-500" />
                        <span>Upload Image</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleUploadClick('document')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                    >
                        <DocumentTextIcon className="w-5 h-5 text-gray-500" />
                        <span>Upload Document</span>
                    </button>
                </div>
            )}
        </div>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your question here..."
          className="w-full p-4 pl-12 pr-16 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          disabled={isTyping}
        />
        <button
          type="submit"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 bg-interactive-blue text-white rounded-lg hover:bg-interactive-blue-hover disabled:bg-gray-400 transition-colors"
          disabled={!userInput.trim() || isTyping}
          aria-label="Send message"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="space-y-4">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={chatEndRef} />
            </div>
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm border-t py-4">
        <div className="px-4">
            {ChatInputForm}
        </div>
        <p className="text-center text-xs text-gray-400 mt-2 px-4">
            LoanMatch AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

export default ChatView;