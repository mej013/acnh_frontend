import React, { useState, useEffect } from 'react';
import { CREATE_USER, LOG_IN } from '../graphql/mutation';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import classes from './Login.module.css';
import Swal from 'sweetalert2';


function useValidSignup(email, password, password1, username, island_title, hemisphere) {
    const [isValid, setValid] = useState(false);
    useEffect(()=> {
        setValid(email != null && email !== '' && email.includes('@') &&
            password != null && password !== '' &&
            password1 != null && password1 !== '' &&
            password === password1 &&
            username != null && username !== '' &&
            island_title != null && island_title !== '' &&
            hemisphere != null && hemisphere !== '')
    }, [email, password, password1, username, island_title, hemisphere]);
    return [isValid];
}


export default function Login () {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPwd, setLoginPwd] = useState("");

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [island_title, setIslandTitle] = useState("");
    const [hemisphere, setHemisphere] = useState("");

    const [isValid] = useValidSignup(email, password, password1, username, island_title, hemisphere);
    const navigate = useNavigate();
    const [registerUser] = useMutation(CREATE_USER, {
        variables:{userInfo:{email, password}, personInfo:{username, hemisphere, island_title}},
        onCompleted: () => {
            Swal.fire(
                {
                    title: 'Register Successful!', 
                    text: 'Now you can log in to Mark and Trade!', 
                    confirmButtonText:'OK!',
                    confirmButtonColor: 'rgb(247,175,128)',
                    background: '#fff0e6',
                    padding: '20px'
                }
            );
            navigate('/home')
        }, 
        onError: () => {
            Swal.fire(
            {
                title: 'Login Error', 
                text: 'The email address has been registered', 
                confirmButtonText:'OK',
                confirmButtonColor: 'rgb(247,175,128)',
                background: '#fff0e6',
                padding: '20px'
            }
            )}
    });
    const [loginUser] = useMutation(LOG_IN, {
        variables: {email: loginEmail, password: loginPwd},
        onCompleted: ({login}) => {
            if (login) {
            localStorage.setItem(process.env.REACT_APP_AUTH_TOKEN, login.token);
            localStorage.setItem(process.env.REACT_APP_USER_ID, login.person._id);
            navigate('/home');
            }
        },
        onError: () => {
            Swal.fire(
            {
                title: 'Login Error', 
                text: 'The combination of your email and password is not found in our database', 
                confirmButtonText:'OK',
                confirmButtonColor: 'rgb(247,175,128)',
                background: '#fff0e6',
                padding: '20px'
            }
            )}
    });

    function validateForm() {
        return loginEmail.length > 0 && loginPwd.length > 0;
    }

    const handleLogin = async(event) => {
        event.preventDefault();
        loginUser();
        
    }


    function handleSignup(event) {
        event.preventDefault();
        if (isValid) registerUser();    
    }
   


    const title = <div className={classes.title}>Register or Login to Explore more!</div>
   
    return (
        <div>
        {title}
        <div className = {classes.Forms}>
            <div className = {classes.Register}>
                <Form.Group size = "lg" controlId="remail" className={classes.FormL}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size = "lg" controlId="runame" className={classes.FormL}>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group size = "lg" controlId="rpwd" className={classes.FormL}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group size = "lg" controlId="rpwd1" className={classes.FormL}>
                    <Form.Label>Confirm Your Password</Form.Label>
                    <Form.Control type="password" value={password1} onChange={(e) => setPassword1(e.target.value)}/>
                </Form.Group>
                <Form.Group size = "lg" controlId="rpwd" className={classes.FormL}>
                    <Form.Label>Island Title</Form.Label>
                    <Form.Control type="island_title" value={island_title} onChange={(e) => setIslandTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group size = "lg" controlId="rpwd" className={classes.FormL}>
                    <Form.Label>Choose Your Hemisphere</Form.Label>
                    <Form.Label className='radio-inline'>
                    <Form.Control type="radio" name='hemisphere' value='north' onChange={(e) => setHemisphere(e.target.value)}/>
                        North
                    </Form.Label>
                    <Form.Label className='radio-inline'>
                        
                    <Form.Control type="radio" name='hemisphere' value='south' onChange={(e) => setHemisphere(e.target.value)}/>
                        South
                    </Form.Label>
                   
                </Form.Group>
                <Button block size = "lg" type="rsubmit" disabled={!isValid} onClick={handleSignup}>
                    Register
                </Button>
            </div>
            <div className = {classes.Login}>
                <Form.Group size = "lg" controlId="lemail" className={classes.FormR}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control autoFocus type="loginEmail" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                />
                </Form.Group>
                <Form.Group size = "lg" controlId="lpwd" className={classes.FormR}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={loginPwd} onChange={(e) => setLoginPwd(e.target.value)}/>
                </Form.Group>
                <Button block size = "lg" type="rsubmit" disabled={!validateForm()} onClick={handleLogin}>
                    Login
                </Button>
            </div>
        </div>
        </div>
    )
        
}