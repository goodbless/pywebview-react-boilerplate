
import { createRoot } from 'react-dom/client'
import reportWebVitals from './reportWebVitals';

// import Header from './components/Header/Header'
// import Editor from './components/Editor/Editor'
// import Ticker from './components/Ticker/Ticker'

import App from './App';

import './index.sass'


// const App = function () {
//   return (
//     <>
//       <Header />
//       <Ticker />
//       <Editor />
//     </>
//   )
// }

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)

export default App





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();