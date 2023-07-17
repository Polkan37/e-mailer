import { useState } from 'react';

export default function useMelissaToken() {
  const getMelissaToken = () => {
    const melissaKey = localStorage.getItem('MelissaToken');
    return melissaKey
  };

  const [melissaToken, setMelissaToken] = useState(getMelissaToken());

  const saveMelissaToken = melissaKey => {
    localStorage.setItem('MelissaToken', melissaKey);
    setMelissaToken(melissaKey);
  };

  return {
    setMelissaToken: saveMelissaToken,
    melissaToken
  }
}

