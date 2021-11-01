import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.js';
import { Home } from './pages/Home/Home.js';
import { Header } from './Components/Header/Header.js';
import { Store, StoreProvider } from './Store.js';

function App() {
	return (
		<Router>
			<div>
				<StoreProvider>
					<Header />
					<Switch>
						<Route exact path='/'>
							<Redirect to='/main' />
						</Route>
						<Route path='/main' component={Home}></Route>
						<Route path='/cart' component={Cart}></Route>
					</Switch>
				</StoreProvider>
			</div>
		</Router>
	);
}

export default App;
