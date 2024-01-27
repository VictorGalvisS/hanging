import { useEffect, useState } from 'react'
import { letters } from './helpers/letters';
import { HangImage } from './components/HangImage'

import './App.css'

// useState - sirve para saber que hubo un cambio en l

function App() {

  const [word] = useState('COMPUTADORA');
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  const [attempts, setAttempts] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  // Determinar si la persona perdio
  useEffect(() => {
    if (attempts >= 9) {
      setLose(true);
    }
  }, [attempts])

  //Determinar si la persona gano
  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if (currentHiddenWord === word) {
      setWon(true);
    }
  }, [hiddenWord, word])

  const checkLetter = (letter: string) => {
    if (lose) return;
    if (!word.includes(letter)) {
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(' ').replace('/s+', ' '));
  };

  return (
    <div className='App'>
      {/* Imagenes */}
      <HangImage imageNumber={attempts} />

      {/* Palabra Oculta */}
      <h3>{hiddenWord}</h3>

      {/* Contador de intentos */}
      <h3>Intentos: {attempts}</h3>

      {/* Mensaje si perdio */}
      {
        (lose) ?
          <h2>Perdio - Palabra era: {word}</h2>
          : ''
      }

      {/* Mensaje si gano */}
      {
        (won) ?
          <h2>Felicidades, usted Gano</h2>
          : ''
      }

      {/* Botones de letras */}
      {
        letters.map(letter => (
          <button
            onClick={() => checkLetter(letter)}
            key={letter}>
            {letter}</button>
        ))
      }
      <button>A</button>

    </div>
  )
}

export default App
