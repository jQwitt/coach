"use client";

import { Button } from "../ui/button";

export interface MessageInputProps {
  actions?: string[];
}

export default function MessageInput({ actions }: MessageInputProps) {
  return (
    <div className="min-w-full px-5">
      <div className="relative">
        <input
          type="text"
          className={`peer w-full pb-1 pt-3 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary transition-colors`}
          placeholder="Talk with the coach"
        />
        <label
          htmlFor="userMessageInput"
          className="pointer-events-none absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
        >
          Tell your coach something...
        </label>
      </div>
      <div className="mt-3 flex gap-2">
        {actions?.map((action) => (
          <Button variant="outline" className="border rounded-full">
            {action}
          </Button>
        ))}
      </div>
    </div>
  );
}
