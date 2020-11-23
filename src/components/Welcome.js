import React from 'react';
import { Helmet } from 'react-helmet';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import '../styles/welcome.scss';

const Welcome = (props) =>{
    const user = props.user
    return(
        <div className="Welcome">
            <Helmet>
                <title>Welcome - Manufac</title>
            </Helmet>
            <AppBar style={{"background":"linear-gradient(90deg, rgba(255,0,224,1) 33%, rgba(175,1,255,1) 66%)"}}>
                <h1 className="nav">Manufac Analytics Private Limited</h1>
            </AppBar>
            <div className="content">
                <h1>Welcome {user.username} !</h1>
                <Button onClick={props.signOut}>SignOut</Button>
            </div>
        </div>
    )
}

export default Welcome;