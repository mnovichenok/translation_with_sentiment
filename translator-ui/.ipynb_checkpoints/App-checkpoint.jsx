/*import React, { useState } from 'react';
import axios from 'axios';

function App(){
    const [french, setFrench] = useState('');
    const [sentiment, setSentiment] = useState('neutral');
    const [english, setEnglish] = useState('');

    const handleTranslate = async () => {
      try {
        const res = await axios.post("http://localhost:8000/translate", {
          french,
          sentiment,
        });
        setEnglish(res.data.translation);  
      } catch (error) {
        console.error("Translation failed:", error);
        setEnglish("Error: " + error.message);
      }
    };


    return (
        <div>
          <h2>Sentiment-Controlled Translator</h2>
          <textarea value={french} onChange={e => setFrench(e.target.value)} placeholder="Enter French text" />
          <select value={sentiment} onChange={e => setSentiment(e.target.value)}>
            <option value="neutral">Neutral</option>
            <option value="joy">Joy</option>
            <option value="sadness">Sadness</option>
            <option value="anger">Anger</option>
            <option value="disgust">Disgust</option>
            <option value="fear">Fear</option>
            <option value="suprise">Surprise</option>
          </select>
          <button onClick={handleTranslate}>Translate</button>
          <p><strong>English:</strong> {english}</p>
        </div>
      );
}

export default App;*/

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [french, setFrench] = useState('');
  const [sentiment, setSentiment] = useState('neutral');
  const [english, setEnglish] = useState('');

  const handleTranslate = async () => {
    console.log("Sending request to backend...", { french, sentiment });
    try {
      const res = await axios.post("http://localhost:8000/translate", {
        french,
        sentiment,
      });
      console.log("Response:", res.data);
      setEnglish(res.data.translation);
    } catch (error) {
      console.error("Translation failed:", error);
      setEnglish("Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Sentiment-Controlled Translation</h2>
      <textarea
        value={french}
        onChange={(e) => setFrench(e.target.value)}
        placeholder="Enter French text"
        rows={4}
        cols={60}
      />
      <br />
      <select value={sentiment} onChange={(e) => setSentiment(e.target.value)}>
        <option value="neutral">Neutral</option>
        <option value="joy">Joy</option>
        <option value="sadness">Sadness</option>
        <option value="anger">Anger</option>
        <option value="disgust">Disgust</option>
        <option value="fear">Fear</option>
        <option value="surprise">Surprise</option>
      </select>
      <br />
      <button onClick={handleTranslate}>Translate</button>
      <h3>English Translation:</h3>
      <p>{english}</p>
    </div>
  );
}

export default App;

