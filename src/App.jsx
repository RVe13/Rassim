import { useReducer } from 'react'

const ACTIONS ={
  CHANGE_PREV_OPER: 'change_prev_oper',
  CHANGE_CURR_OPER: 'change_curr_oper',
  OPERATION: 'operation',
  CALC: 'calc',
  RESET: 'reset'
}

function reducer(state, action){
  switch (action.type) {
    case ACTIONS.RESET:
      return({currentOperand: '', previousOperand: '', operation: ''})
    case ACTIONS.CHANGE_CURR_OPER:
      if(action.payload == 'DEL')return({...state, currentOperand: state.currentOperand.slice(0, -1)})
      if(action.payload == '.'){
        if(state.currentOperand.includes('.'))return({...state});
      }
      return({...state, currentOperand: state.currentOperand + action.payload})
      break;
    case ACTIONS.CHANGE_PREV_OPER:
      return({...state, previousOperand: state.currentOperand})
      break;
    case ACTIONS.OPERATION:
      if(!state.previousOperand && !state.currentOperand) return({...state});
      if(action.payload.previousOperation && !state.currentOperand) return({...state});
      if(!state.previousOperand) return({...state, previousOperand: state.currentOperand, currentOperand: '', operation: action.payload.newOperation })
      if(action.payload.previousOperation){
        if( action.payload.previousOperation == '+') return({...state, previousOperand: String(parseFloat(state.previousOperand) + parseFloat(state.currentOperand)), currentOperand: '', operation: action.payload.newOperation})
        if( action.payload.previousOperation == '-') return({...state, previousOperand: String(parseFloat(state.previousOperand) - parseFloat(state.currentOperand)), currentOperand: '', operation: action.payload.newOperation})
        if( action.payload.previousOperation == '*') return({...state, previousOperand: String(parseFloat(state.previousOperand) * parseFloat(state.currentOperand)), currentOperand: '', operation: action.payload.newOperation})
        if( action.payload.previousOperation == '÷') return({...state, previousOperand: String(parseFloat(state.previousOperand) / parseFloat(state.currentOperand)), currentOperand: '', operation: action.payload.newOperation})
      }
      break;
    case ACTIONS.CALC:
      if(!state.previousOperand) return({...state});
      if( state.operation == '+') return({currentOperand: String(parseFloat(state.previousOperand) + parseFloat(state.currentOperand)), previousOperand: '', operation: ''})
      if( state.operation == '-') return({currentOperand: String(parseFloat(state.previousOperand) - parseFloat(state.currentOperand)), previousOperand: '', operation: ''})
      if( state.operation == '*') return({currentOperand: String(parseFloat(state.previousOperand) * parseFloat(state.currentOperand)), previousOperand: '', operation: ''})
      if( state.operation == '÷') return({currentOperand: String(parseFloat(state.previousOperand) / parseFloat(state.currentOperand)), previousOperand: '', operation: ''})
  }
}

function App(){ 

  const [state, dispatch] = useReducer(reducer, {previousOperand: "", currentOperand: "", operation:""})
  return (
    <div className="calculator-grid-container">
      <div className="output-container">
        <div className="previous-operand">{state.previousOperand}</div>
        <div className="current-operation">{state.operation}</div>
        <div className="current-operand">{state.currentOperand}</div>
      </div>
      <button className="grid-col-span-2" onClick={()=>{dispatch({type: ACTIONS.RESET})}}>AC</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.CHANGE_CURR_OPER, payload: e.target.innerText})}}>DEL</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.OPERATION, payload: {newOperation: e.target.innerText, previousOperation: state.operation}})}}>÷</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.CHANGE_CURR_OPER, payload: e.target.innerText})}}>1</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.CHANGE_CURR_OPER, payload: e.target.innerText})}}>2</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.CHANGE_CURR_OPER, payload: e.target.innerText})}}>3</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.OPERATION, payload: {newOperation: e.target.innerText, previousOperation: state.operation}})}}>*</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.CHANGE_CURR_OPER, payload: e.target.innerText})}}>4</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.CHANGE_CURR_OPER, payload: e.target.innerText})}}>5</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.CHANGE_CURR_OPER, payload: e.target.innerText})}}>6</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.OPERATION, payload: {newOperation: e.target.innerText, previousOperation: state.operation}})}}>+</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.CHANGE_CURR_OPER, payload: e.target.innerText})}}>7</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.CHANGE_CURR_OPER, payload: e.target.innerText})}}>8</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.CHANGE_CURR_OPER, payload: e.target.innerText})}}>9</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.OPERATION, payload: {newOperation: e.target.innerText, previousOperation: state.operation}})}}>-</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.CHANGE_CURR_OPER, payload: e.target.innerText})}}>.</button>
      <button onClick={(e)=>{dispatch({type: ACTIONS.CHANGE_CURR_OPER, payload: e.target.innerText})}}>0</button>
      <button className="grid-col-span-2" onClick={(e)=>{dispatch({type: ACTIONS.CALC, payload: {newOperation: e.target.innerText, previousOperation: state.operation}})}}>=</button>
    </div>
  )
}

export default App
