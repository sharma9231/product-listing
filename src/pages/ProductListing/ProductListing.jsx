import React from 'react';
import styled from "styled-components";
import productJson from '../../MockData/Product.json';
import './ProductListing.css';

const StyledDisableButton = styled.button`
    margin-left: 50px;
    width: 100px; `;

const WrapperDiv = styled.div`
    width: 85%;
    position: relative;
    overflow: hidden;
    margin: 20px auto;
    height: 640px; `;

const BtnWrapperDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute; `;

const CarouselContentDiv = styled.div`
    margin: 60px 0;
    padding: 0;
    list-style: none;
    width: 100%;
    display: flex;
    position: absolute;
    left: 0;
    transition: all 1s ease; `;

const ProductDetailsParagraph = styled.p`
    text-align: center; `;

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

    return (<WrapperDiv>
        <div className="filter">
            <h6>Filters</h6>
                <select onChange={ filterCatergory }>
                <option hidden disabled selected>-- select an option --</option>
                    { uniqueArr.map( ( option, index) => {
                        return (
                            <option value={ option } key={ index }>
                                { option }
                            </option>
                        );
                    } ) }
                </select>
                <StyledDisableButton primary disabled={selectedCategory.length > 0 ? '': 'disabled'} onClick={() => resetFilters()} >Reset</StyledDisableButton>
        </div>
        <CarouselContentDiv >
            {productDisplay.map((content, index) => (
                <div key={index} className={index === 1 ? "carouselCard activeCard" : "carouselCard"}>
                    <picture className={"imageContainer"}>
                        <source srcSet={`../../assets/images/${content?.img}`}  media="(min-width: 800px)" />
                        <img className={"imageContent"} src={`../../assets/images/${content?.img}`} alt="" />
                        </picture>
                    <ProductDetailsParagraph className={"mb-1"}>{content?.name}</ProductDetailsParagraph>
                    <ProductDetailsParagraph className={"mb-1"}>{content?.category}</ProductDetailsParagraph>
                    <ProductDetailsParagraph className={"mb-1"}>{content?.price}</ProductDetailsParagraph>
                </div>
            ))}
        </CarouselContentDiv>
        <BtnWrapperDiv>
            <button onClick={() => clickLeft()}>&#10094;</button>
            <button onClick={() => clickRight()}>&#10095;</button>
        </BtnWrapperDiv>
    </WrapperDiv>)
}

export default ProductListing;