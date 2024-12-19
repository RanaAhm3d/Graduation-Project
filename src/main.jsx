import React from 'react'
import { createRoot } from "react-dom/client";
import './index.css'
import App from './App'
import { store } from './store/index'
import { Provider } from 'react-redux'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import {initialAuth} from './store/reducers/authSlice'

store.dispatch(initialAuth());


createRoot(document.getElementById("root")).render(

  <Provider store={store}>
      <App />
  </Provider>,
)