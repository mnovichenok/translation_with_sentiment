import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App(){
    const [french, setFrench] = useState('');
    const [sentiment, setSentiment] = useState('neutral');
    const [english, setEnglish] = useState('');
    const maxWords = 100;

    const handleInput = (e) => {
      const input = e.target.value;
      const wordCount = input.trim().split(/\s+/).length;
    
      if (wordCount <= maxWords) {
        setFrench(input);
      } else {
        alert("The limit of 128 tokens (~100 words) has been exceeded / La limite de 128 tokens (~100 mots) est dépassée.");
      }
    };

    const translate = async () => {
        if (Object.keys(french).length === 0){
            alert("No input has been provided / Aucune entrée n'a été fournie")
        }else{
            const res = await axios.post("http://localhost:8000/translate", { french, sentiment });
            setEnglish(res.data.translation);
        }
    };

    return (
        <div className="container">
          <h2>Sentiment-Controlled Translator</h2>
          <textarea value={french} onChange={handleInput} placeholder="Enter French text / Entrez du texte français" />
          <select value={sentiment} onChange={e => setSentiment(e.target.value)}>
            <option value="neutral">Neutral</option>
            <option value="joy">Joy</option>
            <option value="sadness">Sadness</option>
            <option value="anger">Anger</option>
            <option value="disgust">Disgust</option>
            <option value="fear">Fear</option>
            <option value="suprise">Surprise</option>
          </select>
          <button onClick={translate} style={{ fontWeight: 'bold' }}>Translate</button>
          <p><strong>English:</strong> {english}</p>
        </div>
      );
}

export default App;
