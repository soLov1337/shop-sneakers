import React from 'react'
import ContentLoader from "react-content-loader"

function Card({ id, title, price, imageUrl, onFavorite, onPlus, favorited=false, added=false, loading=false }) {
	const [isAdded, setIsAdded] = React.useState(added);
	const [isFavorite, setIsFavorite] = React.useState(favorited);

	const onClickFavorite = () => {
		onFavorite({ id, title, price, imageUrl});
		setIsFavorite(!isFavorite);
	}

	const onClickPlus = () => { 
		onPlus({ id, title, price, imageUrl});
		setIsAdded(!isAdded);
	}


	return (
		<div className="card">
			{
				loading ? (
					<ContentLoader
					  speed={2}
					  width={155}
					  height={250}
					  viewBox="0 0 155 265"
					  backgroundColor="#f3f3f3"
					  foregroundColor="#ecebeb">
					  <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
					  <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
					  <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
					  <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
					  <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
					</ContentLoader>
				 ) : 
			
				<>
				<div className="favorite" onClick={onFavorite}>
					<img onClick={onClickFavorite} width={25} src={isFavorite ? "/img/liked.png" : "/img/unliked.png"} alt="Unliked"/>
				</div>
				<img width={133} height={112} src={imageUrl} alt="Icon"/>
				<h5>{title}</h5>
				<div className="row">
					<div className="row-info">
						<span>Цена:</span>
						<b>{price} руб.</b>
					</div>
					<button className="button">
						<img
							width={25}
							onClick={onClickPlus} src={isAdded ? "/img/проверено.svg" : "/img/плюсик.png"}
							alt="Plus"
						/>
					</button>
				</div>
				</>
			}
		</div>
	)
}

export default Card;