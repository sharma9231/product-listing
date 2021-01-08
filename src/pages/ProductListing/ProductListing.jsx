import React from 'react';
import productJson from '../../MockData/Product.json';
import './ProductListing.css';

const ProductListing = (props) => {

    const [ product, setProduct] = React.useState([]);
    const [ productDisplay, setProductDisplay] = React.useState([]);
    const [ selectedCategory, setSelectedCategory] = React.useState([]);

    React.useEffect(() => {
        setProduct(productJson.products);
        setProductDisplay((productJson.products).slice(0,3));
    }, []);

    const clickLeft = () => {
        const newIndex = product;
        newIndex.unshift( newIndex.pop() );
        setProduct(newIndex);
        setProductDisplay(newIndex.slice(0,3))
    }

    const clickRight = () => {
        const newIndex = product;
        newIndex.push( newIndex.shift() );
        setProduct(newIndex);
        setProductDisplay(newIndex.slice(0,3))
    }

    const filterCatergory = (event) => {
        setSelectedCategory(event.target.value);
        const filteredCat = productJson.products.filter(cat=> cat.category === event.target.value );
        setProduct(filteredCat);
        if (filteredCat.length > 2){
            setProductDisplay(filteredCat.slice(0,3))
        } else setProductDisplay(filteredCat)
    }

    const resetFilters =() => {
        setProduct(productJson.products);
        setProductDisplay(productJson.products.slice(0,3));
        setSelectedCategory([]);
    }

    const uniqueArr = [...new Set(productJson.products.map(item => item.category))]
    console.log(uniqueArr)

    return (<div className={"wrapper"}>
        <div className="filter">
            <h6>Filters</h6>
                <select onChange={ filterCatergory }>
                <option hidden disabled selected> -- select an option -- </option>
                    { uniqueArr.map( ( option, index) => {
                        return (
                            <option value={ option } key={ index }>
                                { option }
                            </option>
                        );
                    } ) }
                </select>
                <button primary className={'disabledBtn'} disabled={selectedCategory.length > 0 ? '': 'disabled'} onClick={() => resetFilters()} >Reset</button>
        </div>
        <div className={"carouselContent"} >
            {productDisplay.map((content, index) => (
                <div key={index} className={index === 1 ? "carouselCard activeCard" : "carouselCard"}>
                    <picture className={"imageContainer"}>
                        <source srcSet={`../../assets/images/${content?.img}`}  media="(min-width: 800px)" />
                        <img className={"imageContent"} src={`../../assets/images/${content?.img}`} alt="" />
                        </picture>
                    <p className={"mb-1 productDetails"}>{content?.name}</p>
                    <p className={"mb-1 productDetails"}>{content?.category}</p>
                    <p className={"mb-1 productDetails"}>{content?.price}</p>
                </div>
            ))}
        </div>
        <div className={"button-wrapper"}>
            <button onClick={() => clickLeft()}>&#10094;</button>
            <button onClick={() => clickRight()}>&#10095;</button>
        </div>
    </div>)
}

export default ProductListing;