"use client";

import { useState} from 'react';
import styles from '@/app/page.module.css';
import axios from 'axios';

export interface childProps {
  getAnswerToParent : (res : string) => void;
}

const InputArea : React.FC<childProps> = ({getAnswerToParent}) => {

  const [prompt, setPrompt] = useState<string>("");

  const endpoint = process.env.NEXT_PUBLIC_reply_url;

  const runRequest = () => {
  axios.post( endpoint ? endpoint : "http://127.0.0.1:5000/generate-reply" , {"query" : prompt},
    {
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_front_url ? process.env.NEXT_PUBLIC_front_url : "http://localhost:3000"
      }
    }
  )

  .then((res)=>{
      getAnswerToParent(res.data.result[0].reply);
      console.log(res.data.result[0].reply);
  })

  .catch((err) => {
      console.log(err);
  })

  }
  
  const handleSubmit = (e: React.FormEvent) => {
    getAnswerToParent("");
    runRequest();
    e.preventDefault();
    console.log('Prompt submitted:', prompt);
  };

  return (
      <form className={styles.TextAndButton} onSubmit={handleSubmit}>

        <input
          placeholder="Ask Away !"
          className={styles.InputAreaStyles}
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
        />

        <button
          type="submit" 
          className={styles.buttonType}
        >
          <img src="/send.svg" className={styles.buttonImage} />
        </button>
      </form>
    
  );
};

export default InputArea;
