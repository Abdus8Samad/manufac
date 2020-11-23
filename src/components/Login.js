import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';
import '../styles/form.scss';

// Alert Component
const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    }
}));

const Login = (props) =>{
  const classes = useStyles();

  // Form Values
  const [values, setValues] = useState({
    password: '',
    username: '',
    showPassword: false,
  });

  // Some Dimensions
  const [dims, setDims] = useState({
    lWidth: 100,
    iconSize: 1,
    textMargin: 65
  })

  // Alerts States
  const [alerts, setAlerts] = useState({
    success:{
      open: false,
      msg: ''
    },
    error:{
      open: false,
      msg: ''
    },
    username:false,
    password:false
  })

  // Alert close button
  const handleClose = (event,reason) => {
    if(reason === "clickaway"){
      return;
    }
    setAlerts({
      success:{
        open: false,
        msg: ''
      },
      error:{
        open: false,
        msg: ''
      }
    });
  };

  // Form onchange handle
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // Toggle hide/show password
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  // Prevent Default Actions
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    setAlerts({...alerts,username:false,password:false});

    // Conditions of alerts if they're empty
    if(values.password === '' && values.username === ''){
      setAlerts({...alerts,error:{open:true,msg:'Please Enter Your Username And Password !'},username:true,password:true})
      return;
    } else if(values.username === ''){
      setAlerts({...alerts,error:{open:true,msg:'Please Enter Your Username !'},username:true})
      return;
    } else if (values.password === ''){
      setAlerts({...alerts,error:{open:true,msg:'Please Enter Your Password !'},password:true})
      return;
    }
    let {username, password} = values;
    let user = {
      username,
      password
    }

    // Verifying if user is in the DB
    const verify = props.verifyUser(user);
    if(verify){
      console.log("User Verified");
      props.setUser(user);
    } else {
      // User not signed up
      setAlerts({...alerts, error:{open:true,msg:'Incorrect Username Or Password !'},username:true,password:true});
    }
  }

  useEffect(() =>{
    // Setting dimensions if the page loads in a less window size
    if(window.innerWidth <= 580){
      setDims({...dims, iconSize: 0.5});
    } else if(window.innerWidth <= 800){
      setDims({...dims, iconSize: 0.7});
    } else if(window.innerWidth >= 1130){
      setDims({...dims, lWidth: 150});
    } else if(window.innerWidth >= 900){
      setDims({...dims, lWidth: 120});
    }

    // Setting dimensions if window's size is changed
    window.addEventListener('resize',() =>{
      if(window.innerWidth <= 580){
        setDims({...dims, iconSize: 0.5});
      } else if(window.innerWidth <= 800){
        setDims({...dims, iconSize: 0.7,textMargin: 40});
      } else {
        setDims({...dims, iconSize: 1});
        if(window.innerWidth >= 1170){
          setDims({...dims, lWidth: 150});
        } else if(window.innerWidth >= 900){
          setDims({...dims, lWidth: 110});
        }
      }
    })
  },[])

  return(
      <div className="Login">
          <Helmet>
            <title>Login</title>
          </Helmet>
          <div className={classes.root}>
            <Snackbar open={alerts.success.open} autoHideDuration={6000} id="success" onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                {alerts.success.msg}
              </Alert>
            </Snackbar>
            <Snackbar open={alerts.error.open} autoHideDuration={6000} id="error" onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                {alerts.error.msg}
              </Alert>
            </Snackbar>
          </div>
          <div className="image">
              <img src="https://colorlib.com/etc/lf/Login_v13/images/bg-01.jpg" alt="Girl"/>
          </div>
          <div className="form">
              <h2>Login</h2>
              <form>
                  <FormControl error={alerts.username} required fullWidth className={classes.margin} style={{"marginBottom":dims.textMargin}} variant="outlined">
                      <InputLabel>Username</InputLabel>
                      <OutlinedInput
                          startAdornment={<InputAdornment position="start"></InputAdornment>}
                          onChange={handleChange('username')}
                          labelWidth={dims.lWidth}
                      />
                  </FormControl>
                  <FormControl error={alerts.password} required fullWidth className={classes.margin} style={{"marginBottom":dims.textMargin}} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                          startAdornment={<InputAdornment position="start"></InputAdornment>}
                          id="outlined-adornment-password"
                          type={values.showPassword ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange('password')}
                          labelWidth={dims.lWidth}
                          endAdornment={
                          <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                style={{"transform":`scale(${dims.iconSize})`}}
                              >
                              {values.showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                          </InputAdornment>
                          }
                      />
                  </FormControl>
                  <Button className="login" onClick={(event) => handleSubmit(event)}>Log in</Button>
                  <p>New User? <Link to='/signup'>Sign Up</Link> First</p>
              </form>
          </div>
      </div>
  )
}

export default Login;