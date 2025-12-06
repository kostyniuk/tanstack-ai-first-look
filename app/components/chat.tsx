'use client'
import { useState, useRef, useEffect } from "react";
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";

export function Chat({ className }: { className?: string }) {
    const [input, setInput] = useState("");
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const { messages, sendMessage, isLoading } = useChat({
        connection: fetchServerSentEvents("/api/chat"),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            sendMessage(input);
            setInput("");
        }
    };

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages]);

    return (
        <Card className={`flex flex-col h-[600px] w-full shadow-lg ${className}`}>
            <CardHeader className="border-b px-6 py-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                    <Bot className="w-6 h-6 text-primary" />
                    AI Assistant
                </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea ref={scrollAreaRef} className="h-full p-4">
                    <div className="flex flex-col gap-4">
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-10 opacity-50">
                                <Bot className="w-12 h-12 mb-2" />
                                <p>Start a conversation...</p>
                            </div>
                        )}
                        
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-3 ${
                                    message.role === "assistant" ? "justify-start" : "justify-end"
                                }`}
                            >
                                {message.role === "assistant" && (
                                    <Avatar className="w-8 h-8 border">
                                        <AvatarFallback>AI</AvatarFallback>
                                        <AvatarImage src="/bot-avatar.png" /> 
                                    </Avatar>
                                )}
                                
                                <div
                                    className={`flex flex-col max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                                        message.role === "assistant"
                                            ? "bg-muted text-foreground"
                                            : "bg-primary text-primary-foreground"
                                    }`}
                                >
                                    {message.parts.map((part, idx) => {
                                        if (part.type === "thinking") {
                                            return (
                                                <div
                                                    key={idx}
                                                    className="text-xs opacity-70 italic mb-1 border-l-2 border-primary/30 pl-2"
                                                >
                                                    Thinking: {part.content}
                                                </div>
                                            );
                                        }
                                        if (part.type === "text") {
                                            return <div key={idx} className="whitespace-pre-wrap">{part.content}</div>;
                                        }
                                        return null;
                                    })}
                                </div>

                                {message.role === "user" && (
                                    <Avatar className="w-8 h-8 border">
                                        <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex gap-3 justify-start">
                                <Avatar className="w-8 h-8 border">
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                                <div className="bg-muted text-foreground rounded-lg px-4 py-2 text-sm flex items-center">
                                    <span className="animate-pulse">Thinking...</span>
                                </div>
                             </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>

            <CardFooter className="border-t p-4">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1"
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={!input.trim() || isLoading} size="icon">
                        <Send className="w-4 h-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}