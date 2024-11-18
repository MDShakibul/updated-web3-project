import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MouseFollower } from 'react-mouse-follower';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

createRoot(document.getElementById('root')).render(
	<StrictMode>
	<Provider store={store}>
		<MouseFollower />
		<BrowserRouter>
			<App />
		</BrowserRouter>
		</Provider>
	</StrictMode>
);
