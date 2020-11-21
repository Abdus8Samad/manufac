import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';
import '../styles/form.scss';

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
    },
    icon: {

    }
}));



const SignUp = () =>{
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    username: '',
    email:'',
    showPassword: false,
  });
  const [dims, setDims] = useState({
    lWidth: window.innerWidth/9,
    iconSize: 1
  })
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() =>{
    if(window.innerWidth <= 580){
      setDims({...dims, iconSize: 0.5});
    } else if(window.innerWidth <= 800){      
      setDims({...dims, iconSize: 0.7});
    }
    window.addEventListener('resize',() =>{
      setDims({...dims, lWdith: window.innerWidth/9});
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
          <div className="image">
              <img src="https://colorlib.com/etc/lf/Login_v13/images/bg-01.jpg" alt="Girl"/>
          </div>
          <div className="form">
              <h2>Sign Up</h2>
              <form>
              <FormControl fullWidth className={clsx(classes.margin,classes.textField)} variant="outlined">
                      <InputLabel>Username</InputLabel>
                      <OutlinedInput
                          startAdornment={<InputAdornment position="start"></InputAdornment>}
                          onChange={handleChange('username')}
                          labelWidth={dims.lWidth}
                      />
                  </FormControl>
                  <FormControl fullWidth className={clsx(classes.margin,classes.textField)} variant="outlined">
                      <InputLabel>Email</InputLabel>
                      <OutlinedInput
                          startAdornment={<InputAdornment position="start"></InputAdornment>}
                          onChange={handleChange('email')}
                          labelWidth={dims.lWidth/1.7}
                      />
                  </FormControl>
                  <FormControl fullWidth className={clsx(classes.margin,classes.textField)} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                          startAdornment={<InputAdornment position="start"></InputAdornment>}
                          id="outlined-adornment-password"
                          type={values.showPassword ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange('password')}
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
                          labelWidth={dims.lWidth}
                      />
                  </FormControl>
                  <button className="signup">Sign Up</button>
                  <p>Already a User? <Link to='/'>Log In</Link></p>
              </form>
          </div>
      </div>
  )
}

export default SignUp;