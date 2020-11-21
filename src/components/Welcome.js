import React from 'react';

const Welcome = (props) =>{

    return(
        <div className="Welcome">
            <h1>Welcome</h1>
            <button onClick={props.signOut}>SignOut</button>
        </div>
    )
}

export default Welcome;