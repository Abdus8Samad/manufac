import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
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
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';
import '../styles/form.scss';

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
    },
    textField: {
      marginBottom:65
    }
}));



const SignUp = (props) =>{
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    username: '',
    email:'',
    showPassword: false,
  });
  const [dims, setDims] = useState({
    lWidth: window.innerWidth/8.7,
    iconSize: 1
  })

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
    email:false,
    password:false
  })

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

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    if(values.password === '' && values.username === ''){
      setAlerts({...alerts,error:{open:true,msg:'Please Enter Your Username And Password !'},username:true,password:true});
      return;
    } else if(values.username === ''){
      setAlerts({...alerts,error:{open:true,msg:'Please Enter Your Username !'},username:true});
      return;
    } else if (values.password === ''){
      setAlerts({...alerts,error:{open:true,msg:'Please Enter Your Password !'},password:true});
      return;
    }

    /* Validation */
    // Username

    const userRE = /^\S*$/;
    if(values.username.length < 6 || !userRE.test(values.username)){
      setAlerts({...alerts,error:{open:true,msg:'Please Check Username Validation Rules'},username:true});
      return;
    }

    // Password

    const passRE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(values.password.length < 8 || !passRE.test(values.password)){
      setAlerts({...alerts,error:{open:true,msg:'Please Check Password Validation Rules'},password:true});
      return;
    }

    // Email

    const emailRE = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    if(!emailRE.test(values.email)){
      setAlerts({...alerts,error:{open:true,msg:'Please Enter a Valid Email Address'},email:true})
      return;
    }

    let {username, password, email} = values;
    let user = {
      username,
      password,
      email
    }
    props.signUp(user);
  }

  useEffect(() =>{
    // if(window.innerWidth <= 580){
    //   setDims({...dims, iconSize: 0.5});
    // } else if(window.innerWidth <= 800){
    //   setDims({...dims, iconSize: 0.7});
    // }
    window.addEventListener('resize',() =>{
      setDims({...dims, lWidth: window.innerWidth/8.7});
      if(window.innerWidth <= 580){
        setDims({...dims, iconSize: 0.5});
      } else if(window.innerWidth <= 800){
        setDims({...dims, iconSize: 0.7});
      } else {
        setDims({...dims, iconSize: 1});
      }
    })
  },[dims])

  return(
      <div className="SignUp">
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
              <h2>Sign Up</h2>
              <form>
                  <FormControl required error={alerts.username} fullWidth className={clsx(classes.margin,classes.textField)} variant="outlined">
                      <InputLabel>Username</InputLabel>
                      <OutlinedInput
                          startAdornment={<InputAdornment position="start"></InputAdornment>}
                          onChange={handleChange('username')}
                          labelWidth={dims.lWidth}
                      />
                  </FormControl>
                  <FormControl error={alerts.email} fullWidth className={clsx(classes.margin,classes.textField)} variant="outlined">
                      <InputLabel>Email</InputLabel>
                      <OutlinedInput
                          aria-describedby="my-helper-text"
                          startAdornment={<InputAdornment position="start"></InputAdornment>}
                          onChange={handleChange('email')}
                          labelWidth={dims.lWidth/1.7}
                      />
                      <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                  </FormControl>
                  <FormControl required error={alerts.password} fullWidth className={clsx(classes.margin,classes.textField)} variant="outlined">
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
                  <Button className="signup" onClick={(event) => handleSubmit(event)}>Sign Up</Button>
                  <p>Already Registered? <Link to='/'>Log In</Link> Here</p>
                  <Alert severity="info">
                    <span style={{"color":"black"}}>Password:</span> It should have Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (@ $ ! % * ? &)<br />
                    <span style={{"color":"black"}}>Username:</span> It should have at least six characters
                  </Alert>
              </form>
          </div>
      </div>
  )
}

export default SignUp;