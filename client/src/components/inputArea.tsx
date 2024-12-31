"use client";

import { useState} from 'react';
import styles from '@/app/page.module.css';
import axios from 'axios';

export interface childProps {
  getAnswerToParent : (res : string) => void;
}

const InputArea : React.FC<childProps> = ({getAnswerToParent}) => {

  const [prompt, setPrompt] = useState<string>("");

  const runRequest = () => {
  axios.post( "https://medlas.onrender.com" , {"query" : prompt},
    {
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "https://medlas.vercel.app",
        'Access-Control-Allow-Methods': 'POST',
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
