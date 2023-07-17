import { useState } from 'react';

export default function useLicaToken() {
    const getLicaToken = () => {
      const licaKey = localStorage.getItem('LicaToken');
      return licaKey
    };
  
    const [licaToken, setLicaToken] = useState(getLicaToken());
  
    const saveLicaToken = licaKey => {
      localStorage.setItem('LicaToken', licaKey);
      setLicaToken(licaKey);
    };
  
    return {
      setLicaToken: saveLicaToken,
      licaToken
    }
  }