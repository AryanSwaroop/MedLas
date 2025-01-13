'use client';

import splitStringUsingRegex from '@/transitions/splitUsingRegex';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  reply: string;
}

const variants = {
  hidden: { opacity: 0 },
  reveal: { opacity: 1 },
};

const ChatRoom: React.FC<Props> = ({ reply }) => {
  const [replyAns, setReplyAns] = useState(splitStringUsingRegex(reply));

  useEffect(() => {
    setReplyAns([]); // Clear current state before setting new reply
    setReplyAns(splitStringUsingRegex(reply));
    window.location.href = "#chatRoomDiv"; // Scroll to the chat room div
  }, [reply]);

  return (
    <div
      id="chatRoomDiv"
      className="text-amber-800 bg-white w-11/12 mx-auto mt-10 p-4 rounded-xl mb-10"
    >
      <motion.p
        initial="hidden"
        whileInView="reveal"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.02 }}
      >
        {replyAns.map((char, index) => (
          <motion.span
            key={char + index} // Stable key using a combination of char and index
            transition={{ duration: 0.5 }}
            variants={variants}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};

export default ChatRoom;
