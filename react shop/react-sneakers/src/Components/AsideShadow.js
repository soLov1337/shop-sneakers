import AppContext from "./pages/context";
import React from 'react';

export default function AsideShadow({ onClose, onRemove, items = [] }) {
	const {cartItems} = React.useContext(AppContext);
	const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
	const perCentPrice = Math.ceil(totalPrice);

	return (
		<div className="aside-shadow">
			<div className="aside">
				<div className="aside-close">
					<h2>Корзина</h2>
					<img onClick={onClose} width={25} height={25} src="./img/close.png" alt="Close"/>
				</div>
				{
					items.length > 0 ? (
					<>
						<div className="items">
							{items.map((obj) => (
								<div key={obj.id} className="cartItem">
									<img width={70} src={obj.imageUrl} alt="Nike" />
									<div>
										<p>{obj.title}</p>
										<b>{obj.price} руб.</b>
									</div>
									<img onClick={() => onRemove(obj.id)} className="removebtn" width={40} height={40} src="/img/btn.png" alt="Button" />
								</div>
							))
							}
							</div>
							<ul className="items-ul">
								<li className="items-li">
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} руб.</b>
								</li>
								<li className="items-li">
								<span>Налог 13%</span>
									<div></div>
									<b>{perCentPrice / 100 * 13} руб.</b>
								</li>
							</ul>
								<button>Оформить заказ</button>
					</>) : (<div className="box">
						<img width={80} src="/img/box.png" alt="box" />
						<h2>Корзина пустая</h2>
						<p>Добавьте хотя бы одну пару кроссовок, что бы сделать заказ</p>
						<button onClick={onClose}>Вернуться назад</button>
						</div>
				)}
			</div>
	</div>
	);
}
