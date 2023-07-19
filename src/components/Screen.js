import React from 'react'

export default function Screen(props) {
	const {addToPrompt, deleteLast, currentPrompt, setCurrentPrompt,
	result, setResult, errorMessage, setErrorMessage, mode, setMode} = props;
	function changePrompt(event) {
		setErrorMessage('')
		let promptValue = event.target.value;
		let value = (promptValue.charAt(0) === '0' && promptValue.charAt(1) !== '.') ? promptValue.slice(1) : promptValue;
		const cleanedValue = value.split('').map((char, i) => {
			if (Number(char) || char === '0' || char === '+' || char === '-' || char === '÷' || char === '×'
		  || char === '.' || char === '%' || char === '(' || char === ')' || char === '^') {
				let lastInp = value[i-1];
				if (char === ')' && lastInp === '(') {
					setErrorMessage('parentheses can not be empty')
				} else if (currentPrompt === '0' && char === '%') {
					setErrorMessage("\"%\" must used after a number")
				} else if (currentPrompt === '0' && value === '^') {
					setErrorMessage('the power must come after a number')
				} else if (currentPrompt === '0') {
					return char
				} else if (lastInp === '%' && (Number(char) || char === '0')) {
					setErrorMessage('putting a number after "%" directly leads to incorrect results')
				}else if (char === '-' && lastInp === '-') {
				} else if (
					!(Number(lastInp) || lastInp === '0' || Number(char) || char === '0') &&
					!(lastInp === '%' || (char === '-' && lastInp !== '-') || (char==='.') || char === '(' || char === ')' || (lastInp === ')' && char === '^') 
					|| lastInp === '(' || lastInp === '')
					) {
						setTimeout(() => {setCurrentPrompt(prev => prev.split('').filter((value, index) => index !== i-1).join(''))},5)
					if (mode === 'result') setMode('prompt')
						return char
				} else {
					if (mode === 'result') setMode('prompt')
					return char
				}
				}})
				setCurrentPrompt(cleanedValue.join(''))
	}
	function getResult(event) {
		if (event.key === 'Enter' && mode === 'prompt') {
			setMode('result')
			setCurrentPrompt(result)
			setResult('')
		}
	}
	
	return(
		<div className="screen">
			<input autoFocus className="Prompt-input" value={currentPrompt} onChange={changePrompt} onKeyUp={getResult}/>
			 {!errorMessage && result !== '0' && <span className="result">{result}</span>}
			 {errorMessage && <span className="error-message">{errorMessage}</span>}
		</div>
	)
}
