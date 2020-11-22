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
import { Link } from 'react-router-dom';
import '../styles/form.scss';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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



const Login = (props) =>{
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    username: '',
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
    setAlerts({...alerts,username:false,password:false});
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
    const verify = props.verifyUser(user);
    console.log(verify);
    if(verify){
      console.log("User Verified");
      props.setUser(user);
    } else {
      setAlerts({...alerts, error:{open:true,msg:'Incorrect Username Or Password !'},username:true,password:true});
    }
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
      <div className="Login">
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
                  <FormControl error={alerts.username} required fullWidth className={clsx(classes.margin,classes.textField)} variant="outlined">
                      <InputLabel>Username</InputLabel>
                      <OutlinedInput
                          startAdornment={<InputAdornment position="start"></InputAdornment>}
                          onChange={handleChange('username')}
                          labelWidth={dims.lWidth}
                      />
                  </FormControl>
                  <FormControl error={alerts.password} required fullWidth className={clsx(classes.margin,classes.textField)} variant="outlined">
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