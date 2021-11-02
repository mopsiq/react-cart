import React from 'react';

const CartItem = ({
	item,
	id,
	price,
	discount,
	deleteFunc,
	addFunc,
	updateCounterFunc,
}) => {
	const formattedString = item.name[0].toUpperCase() + item.name.slice(1);
	return (
		<>
			<div className='cart__item'>
				<h3 className='cart__name'>Название:{formattedString}</h3>
				<span>Итоговая стоимость: {item.cost}$</span>
				<div className='cart__info'>
					<button
						className='cart__btn'
						onClick={(e) => updateCounterFunc(id, price, discount)}
					>
						-
					</button>
					<span>{item.count}</span>
					<button
						className='cart__btn'
						onClick={(e) => addFunc(id, price, discount)}
					>
						+
					</button>
					<button
						className='cart__closed'
						onClick={() => deleteFunc(id)}
					>
						X
					</button>
				</div>
			</div>
		</>
	);
};

export { CartItem };
