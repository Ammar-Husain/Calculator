import React from 'react'

export default function Keyboard(props) {
	const {addToPrompt, currentPrompt, setCurrentPrompt, result,
	mode, setMode, setResult, setErrorMessage, deleteLast} = props;
	function clear() {
		setErrorMessage('')
		setCurrentPrompt('0')
		setResult('0')
	}
	function getResult() {
		if (mode === 'prompt') {
		setMode('result')
		setCurrentPrompt(result)
		setResult('')
		}
	}
	return(
		<div className="keyboard">
					<div className="column">
						<button id="orange" onClick={event => addToPrompt('^2')}>
							x²
						</button>
						<button id="red" onClick={clear}>
							C
						</button>
						<button onClick={event => addToPrompt(event.target.innerText)}>
							7
						</button>
						<button onClick={event => addToPrompt(event.target.innerText)}>
							4
						</button>
						<button onClick={event => addToPrompt(event.target.innerText)}>
							1
						</button>
						<button onClick={event => addToPrompt(event.target.innerText)}>
							%
						</button>
					</div>
					<div className="column">
						<button id ="orange" onClick={event => addToPrompt('^')}>
							xⁿ
						</button>
						<button id ="orange" onClick={event => addToPrompt(event.target.innerText)}>
							÷
						</button>
						<button onClick={event => addToPrompt(event.target.innerText)}>
							8
						</button>
						<button onClick={event => addToPrompt(event.target.innerText)}>
							5
						</button>
						<button onClick={event => addToPrompt(event.target.innerText)}>
							2
						</button>
						<button onClick={event => addToPrompt(event.target.innerText)}>
							0
						</button>
					</div>
					<div className="column">
						<button id ="orange" onClick={event => addToPrompt(event.target.innerText)}>
							(
						</button>
						<button id ="orange" onClick={event => addToPrompt(event.target.innerText)}>
							×
						</button>
						<button onClick={event => addToPrompt(event.target.innerText)}>
							9
						</button>
						<button onClick={event => addToPrompt(event.target.innerText)}>
							6
						</button>
						<button onClick={event => addToPrompt(event.target.innerText)}>
							3
						</button>
						<button  onClick={event => addToPrompt(event.target.innerText)}>
							.
						</button>
					</div>
					<div className="column">
						<button id="orange" onClick={event => addToPrompt(event.target.innerText)}>
							)
						</button>
						<button id="orange" onClick={deleteLast}>
							del
						</button>
						<button id="orange" onClick={event => addToPrompt(event.target.innerText)} >
							-
						</button>
						<button id="orange" onClick={event => addToPrompt(event.target.innerText)}>
							+
						</button>
						<button className="double" id="orange" onClick={getResult}>
							=
						</button>
					</div>
				</div>	
	)
}