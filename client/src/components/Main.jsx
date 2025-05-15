import React from 'react';
import Nav from './Nav'
const Main = ({child}) => {
    return (
        <div>
           <Nav/>
           {child}
        </div>
    );
};

export default Main;