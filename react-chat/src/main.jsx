import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import {ErrorProvider} from "./context/ErrorContext.jsx";
import {Provider} from "react-redux";
import store from './store/store'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorProvider>
            <Provider store={store}>
            <App/>
            </Provider>
        </ErrorProvider>

    </StrictMode>,
)