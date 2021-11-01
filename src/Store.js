import React, { useReducer, useEffect, createContext } from 'react';

export const Store = createContext('');
export function StoreProvider(props) {
	const localJSON = JSON.parse(localStorage.getItem('userCart'));
	const store = {
		currentItemsList: localJSON ? localJSON : [],
		productsList: [
			{ name: 'apple', count: 5, price: 8, discount: false, id: 1 },
			{ name: 'banana', count: 35, price: 10, discount: false, id: 2 },
			{ name: 'papaya', count: 20, price: 10, discount: 5, id: 3 },
		],
	};

	const [localStore, dispatch] = useReducer(reducer, store);

	useEffect(() => {
		if (localStorage.getItem('userCart')) {
			const newObj = Object.assign(
				localStore.currentItemsList,
				JSON.parse(localStorage.getItem('userCart'))
			);
			localStorage.setItem('userCart', JSON.stringify(newObj));
		} else {
			localStorage.setItem('userCart', JSON.stringify([]));
		}
	}, [localStorage.getItem('userCart')]);

	function reducer(state, action, field) {
		switch (action.type) {
			case 'SET_DATA':
				return {
					...state,
					currentItemsList: [
						...state.currentItemsList,
						action.payload,
					],
				};
			case 'NEW_DATA':
				return {
					...state,
					currentItemsList: action.payload,
				};
			case 'CLEAR_DATA':
				return {
					currentItemsList: [],
				};
			default:
				throw new Error();
		}
	}

	return (
		<Store.Provider value={[localStore, dispatch]}>
			{props.children}
		</Store.Provider>
	);
}
