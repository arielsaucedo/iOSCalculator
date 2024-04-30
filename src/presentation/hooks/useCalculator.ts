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
    setPreviousNumber('0');
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

  const toogleNumberSign = () => {
    if (number.includes('-')) {
      setNumber(number.replace('-', ''));
    } else {
      setNumber('-' + number);
    }
  };

  const setLastNumber = () => {
    if (number.endsWith(',')) {
      setPreviousNumber(number.slice(0, -1));
    } else {
      setPreviousNumber(number);
    }
    setNumber('0');
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };

  const sumOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.sum;
  };

  const substractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.substract;
  };

  const calculateResult = () => {
    const num1 = Number(number);
    const num2 = Number(previousNumber);

    switch (lastOperation.current) {
      case Operator.sum:
        setNumber(`${num1 + num2}`);
        break;
      case Operator.substract:
        setNumber(`${num2 - num1}`);
        break;
      case Operator.multiply:
        setNumber(`${num1 * num2}`);
        break;
      case Operator.divide:
        setNumber(`${num2 / num1}`);
        break;
    }

    setPreviousNumber('0');
  };

  return {
    //Properties
    number,
    previousNumber,

    //Methods
    buildNumber,
    clean,
    deleteOperation,
    toogleNumberSign,
    divideOperation,
    multiplyOperation,
    sumOperation,
    substractOperation,
    calculateResult,
  };
};
