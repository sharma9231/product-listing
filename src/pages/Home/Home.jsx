
import React from 'react';
import ProductListing from '../ProductListing/ProductListing';
import './Home.css';

const Home = (props) => {
    return (<div className={'home-container'}>
        <header>
            <h2 className={'header ml-3'}>Product Cards Listing</h2>
        </header>
        <div className={'row m-0'}>
            <ProductListing></ProductListing>
        </div>
    </div>)
}

export default Home;