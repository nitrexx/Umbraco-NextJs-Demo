'use client';
import { Metadata } from "next";
import { DropDownList, DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import React from "react";

/**
 * Returns a simple HTML page
 * @returns 
 */
const DropDown = () => {
    const categories = ['Pizza', 'Burger', 'Pasta', 'Burrito'];
     const [state, setState] = React.useState({
        value: 'Pizza' // default value
    });

    const handleChange = (event: DropDownListChangeEvent) => {
        setState({
            value: event.target.value
        });
    };
    
    return (
        <>
            <DropDownList style={{ width: '300px' }} data={categories} defaultValue="Pizza" onChange={handleChange}/>
            <div className="mt-4">
                <h2 className="text-xl mb-2">Selected value</h2>
                <p>{state.value}</p>
            </div>
        </>
    );
}


export default DropDown;
