'use client';

import splitStringUsingRegex from '@/transitions/splitUsingRegex';
import styles from '../app/page.module.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  reply: string;
}

const variants = {
  hidden: { opacity: 0 },
  reveal: { opacity: 1 },
}

const ChatRoom: React.FC<Props> = ({ reply }) => {

  const [replyAns , setReplyAns] = useState(splitStringUsingRegex(reply));

  useEffect(() => {
    setReplyAns([]);
    setReplyAns(splitStringUsingRegex(reply));
    window.location.href = "#chatRoomDiv";
  },[reply])

  return (
    <div className={styles.chatRoom} id='chatRoomDiv'>
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
  )
}

export default ChatRoom;
