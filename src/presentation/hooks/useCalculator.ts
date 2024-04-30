import {useRef, useState} from 'react';

enum Operator {
  sum,
  substract,
  multiply,
  divide,
}

export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [previousNumber, setPreviousNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  const buildNumber = (numberString: string) => {
    if (number.includes(',') && numberString === ',') {
      return;
    }

    if (number.startsWith('0') || number.startsWith('-0')) {
      //Poner punto decimal
      if (numberString === ',') {
        return setNumber(number + numberString);
      }

      //Evaluar si es otro 0 y no hay punto
      if (numberString === '0' && number.includes(',')) {
        return setNumber(number + numberString);
      }

      //Evaluar si es diferente a 0, no tiene punto y es el primero
      if (numberString !== '0' && !number.includes(',')) {
        return setNumber(numberString);
      }

      //Evitar 0000.0
      if (numberString === '0' && !number.includes(',')) {
        return;
      }

      return setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };

  const clean = () => {
    setNumber('0');
  };

  const deleteOperation = () => {
    // Solucion de creada
    // if (number.length === 1 || (number.length === 2 && number.includes('-'))) {
    //   setNumber('0');
    // } else {
    //   setNumber(number.slice(0, -1));
    // }

    // Solucion del curso
    let currentSign = '';
    let temporalNumber = number;

    if (number.includes('-')) {
      currentSign = '-';
      temporalNumber = number.substring(1);
    }

    if (temporalNumber.length > 1) {
      return setNumber(currentSign + temporalNumber.slice(0, -1));
    }

    setNumber('0');
  };

  const setLastNumber = () => {};

  const toogleNumberSign = () => {
    if (number.includes('-')) {
      setNumber(number.replace('-', ''));
    } else {
      setNumber('-' + number);
    }
  };

  return {
    //Properties
    number,

    //Methods
    buildNumber,
    clean,
    deleteOperation,
    toogleNumberSign,
  };
};
