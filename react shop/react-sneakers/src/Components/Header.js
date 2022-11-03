import { Link } from "react-router-dom";
import AppContext from "./pages/context";
import React from 'react';


function Header(props) {

	const {cartItems} = React.useContext(AppContext);
	const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

	return (
		<header>
			<Link to="/">
				<div className="headerLeft">
					<img width={100} src="https://mir-s3-cdn-cf.behance.net/project_modules/source/ee5aff98105449.5ed4f252c74cc.jpg" alt="Icon" />
					<div className="headerInfo">
						<h3>React Sneakers</h3>
						<p>Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>
			<ul className="headerRight">
				<li onClick={props.onClickCart}>
					<img width={18} src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/344/external-shopping-cart-miscellaneous-kiranshastry-lineal-kiranshastry.png" alt="Icon" />
					<span>{totalPrice} руб.</span>
				</li>
				<li>
					<Link to="/favorites"><img width={18} src="/img/heart.png" alt="Icon" /></Link>
				</li>
				<li>
					<img width={18} src="https://img.icons8.com/ios/344/user-male-circle.png" alt="Icon" />
				</li>
			</ul>
		</header>
	);
};

export default Header;