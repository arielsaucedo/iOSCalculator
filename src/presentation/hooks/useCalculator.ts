import {useEffect, useRef, useState} from 'react';

enum Operator {
  sum = '+',
  substract = '-',
  multiply = 'X',
  divide = '÷',
}

export const useCalculator = () => {
  const [formula, setFormula] = useState<string>('');
  const [number, setNumber] = useState('0');
  const [previousNumber, setPreviousNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  useEffect(() => {
    if (lastOperation.current) {
      const firstFormulaPart = formula.split(' ')[0];
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
    } else {
      setFormula(number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setPreviousNumber(`${subResult}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formula]);

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
    setFormula('');
    lastOperation.current = undefined;
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
    calculateResult();

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
    const result = calculateSubResult();
    setFormula(`${result}`);

    lastOperation.current = undefined;
    setPreviousNumber('0');
  };

  const calculateSubResult = () => {
    const [firtValue, operation, secondValue] = formula.split(' ');

    const num1 = Number(firtValue);
    const num2 = Number(secondValue);

    if (isNaN(num2)) {
      return num1;
    }

    switch (operation) {
      case Operator.sum:
        return num1 + num2;

      case Operator.substract:
        return num1 - num2;

      case Operator.multiply:
        return num1 * num2;

      case Operator.divide:
        return num1 / num2;
    }
  };

  return {
    //Properties
    number,
    previousNumber,
    formula,

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
