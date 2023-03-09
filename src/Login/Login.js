import React, { useState, useEffect } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Json from '../cards.json'

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState({})
  const [userInputVal, setUserInputVal] = useState({
    email: "",
    password: "",

  });
  const validate = () => {
    let errors = {};
    const { email, password } = userInputVal;
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const getData = (e) => {
    const { value, name } = e.target;
    setUserInputVal(() => {
      return {
        ...userInputVal,
        [name]: value,
      };
    });
  };
  const handleLoginData = (e) => {
    e.preventDefault();
    const getUserArr = JSON.parse(localStorage.getItem("users")) || [];
    const { email, password } = userInputVal;
    if (validate()) {

      if (getUserArr && getUserArr.length) {
        const userLogin = getUserArr.find((el, k) => {
          return el.email === email && el.password === password
        });
        console.log(userLogin)
        if (userLogin !== undefined) {
          localStorage.setItem("loggedUser", JSON.stringify(userLogin))
        if(!JSON.parse(localStorage.getItem('allpost'))){
          localStorage.setItem('allpost',JSON.stringify(Json.feedPost))   
           
        }   
          navigate("/")
        }else{
          alert("invalid details")
        }
      
      }else{
        alert("Signup First")
      }

    }
  };
  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("loggedUser"))
    if (currUser) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <section>
        <div className="login">
          <div className="leftSection">
            <h1 className='facebookTitle'> facebook</h1>
            <p className="facebookText">
              Facebook helps you connect and share with the people in your life
            </p>
          </div>
          <div className="formContainer">
            <form className='form'>
              <input className='email' type="email" name="email" placeholder='Email address' required onChange={getData} />
              {error.email && (
                <span className="error">{error.email}</span>
              )}
              <input className='password' type="password" name="password" placeholder='Password' required onChange={getData} />
              {error.password && (
                <span className="error">{error.password}</span>
              )}
              <button className='loginbtn' type="submit" onClick={handleLoginData}>Log in</button>
            </form>
            <button className='newAccountbtn' ><NavLink to='/signup'>Create new Account</NavLink></button>
          </div>

        </div>
      </section>
    </>)
}

export default Login;