"use client";
import { MessageCircle } from "lucide-react";
export default function WhatsAppFloatButton() {
    return (<a href="https://wa.me/919068635351?text=Hi! I'd like to know more about Infinity Creations products." target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-moss text-paper shadow-lg transition-transform hover:scale-110 focus-ring">
      <MessageCircle size={26}/>
    </a>);
}
