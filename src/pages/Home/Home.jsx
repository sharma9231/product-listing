
import React from 'react';
import styled from "styled-components";
import ProductListing from '../ProductListing/ProductListing';

const HomeContainerDiv = styled.div`
    background-color: #c7ccc9; `;

const HeaderDiv = styled.h2`
    text-align: center; `;
    

const Home = (props) => {
    return (<HomeContainerDiv>
        <header>
            <HeaderDiv className={'ml-3'}>Product Cards Listing</HeaderDiv>
        </header>
        <div className={'row m-0'}>
            <ProductListing></ProductListing>
        </div>
    </HomeContainerDiv>)
}

export default Home;