import React, {useState, useEffect} from 'react'
import Screen from './Screen.js'
import Keyboard from './Keyboard.js'

export default function App() {
	const[mode, setMode] = useState('prompt')
	const [currentPrompt, setCurrentPrompt] = useState('0')
	const [result, setResult] = useState(0)
	const [errorMessage, setErrorMessage] = useState('')
	
	useEffect(() => {
		const lastInp = currentPrompt.charAt(currentPrompt.length-1);
		const openParenthesis = currentPrompt.split('').filter(char => char === '(').length
		const closeParenthesis = currentPrompt.split('').filter(char => char === ')').length
		if (mode === 'prompt' && (Number(lastInp) || lastInp === '0' || lastInp === '%'
		|| lastInp === '(' || lastInp === ')') && 
		openParenthesis === closeParenthesis) {
			const readyToEval = currentPrompt.split('').map((char, i) => {
				const prevChar = currentPrompt[i-1];
				switch(char) {
					case 'x':
						return '*'
					case '÷':
						return '/'
					case '×':
						return '*'
					case '%':
						return '/100'
					case '^':
						return '**'
					case '(':
						if(Number(prevChar) || prevChar === '0' || prevChar === ')') {
							return '*('
						} else return '('
					case ')':
						if((Number(currentPrompt[i+1]) || currentPrompt[i+1] === '0') 
						&& (prevChar === '-' || prevChar === '+')) {
							return '0)*'
						}
						else if((Number(currentPrompt[i+1]) || currentPrompt[i+1] === '0') 
						&& (prevChar === '×' || prevChar === '÷' || prevChar === '^')) {
							return '1)*'
						}
						else if(Number(currentPrompt[i+1]) || currentPrompt[i+1] === '0') {
							return ')*'
						} else if (prevChar === '+' || prevChar === '-') {
							return '0)'
						} else if (prevChar === '×' || prevChar === '÷' || prevChar === '^') {
							return '1)'
						}
						else return ')'
					default:
					return char
				}
			}).join('')
			setTimeout(() => setResult([eval(readyToEval)].join('')), 6)
		}
		if (!currentPrompt) {
			setCurrentPrompt('0')
		} if (openParenthesis > closeParenthesis) {
			setErrorMessage('unclosed "("')
		} if (openParenthesis < closeParenthesis) {
			setErrorMessage(`a ")" dosen't match any "("`)
		}
	},[currentPrompt])
	
	function addToPrompt(value) {
		setErrorMessage('');
		let lastInp = currentPrompt[currentPrompt.length-1]
		if (value === ')' && lastInp === '(') {
			setErrorMessage('parentheses can not be empty')
		}
		else if (currentPrompt === '0' && value === '%') {
			setErrorMessage("\"%\" must used after a number")
		}
		else if (currentPrompt === '0' && value === '0') {
			setErrorMessage(`you can't start first number with zero if you want to use decimals use "." directly`);
		} else if(currentPrompt === '0' && value==='^') {
			setErrorMessage('the power must come after a number')
		} else if (currentPrompt === '0'){
			setCurrentPrompt(value)
		} else if ( lastInp === '%' && (Number(value) || value === '0')) {
			setErrorMessage('putting a number after "%" directly leads to incorrect results')
		} else if (
			!(Number(lastInp) || lastInp === '0' || Number(value) || value === '0')
			&& !(lastInp === '%' || (value ==='-' && lastInp !== '-') || value ==='(' || value ===')'
			|| lastInp === '(' || lastInp === ')'  || (value==='.' && lastInp ==='^'))) {
			deleteLast();
			setCurrentPrompt(prevPrompt => prevPrompt + value)
			if (mode === 'result') setMode('prompt')
		} else {
			setCurrentPrompt(prevPrompt => prevPrompt + value)
			if(mode === 'result') setMode('prompt')
		}
	}
	function deleteLast() {
		setErrorMessage('');
		setCurrentPrompt(prevPrompts => prevPrompts.length === 1 ? '0' :
			prevPrompts.substring(0, prevPrompts.length - 1))
	}
	return(
		<div className="calculator">
			<Screen 
				currentPrompt={currentPrompt}
				setCurrentPrompt={setCurrentPrompt}
				result={result}
				errorMessage={errorMessage}
				setErrorMessage={setErrorMessage}
				mode={mode}
				setMode={setMode}
				setResult={setResult}
				addToPrompt = {addToPrompt}
				dleteLast={deleteLast}/>
			<Keyboard 
				currentPrompt={currentPrompt}
				setCurrentPrompt = {setCurrentPrompt} 
				mode={mode} setMode={setMode}
				result={result}
				setResult = {setResult}
				setErrorMessage = {setErrorMessage}
				addToPrompt={addToPrompt}
				deleteLast={deleteLast}/>
		</div>
	)
}