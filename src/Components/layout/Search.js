import React from 'react';

function Search(){
    return(
        <p>
           <input type="text"
                name="title"
                style={{padding: '5px'}}
                placeholder="Hae">
            </input> 
           <input
            type="submit"
            value="Submit"
            className="btn"/>
        </p>
    )
}

export default Search