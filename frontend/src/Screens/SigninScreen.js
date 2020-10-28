import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { signin } from '../actions/userActions';
function SigninScreen(props) {
    
    const [email, setEmail] = useState(''); // useState returns a pair: current state value and function to update it. intial state is empty
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state=>state.userSignin);
    const {loading, userInfo, error} = userSignin;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/'; //Will redirect to shipping page if userInfo exists, if not redirect to signin.
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
        return () => {
    
        }
    }, [userInfo]) //If userInfo state changes, useEffect runs again.

   const submitHandler = (e) => {
       e.preventDefault() // Don't refresh screen when user clicks on signin
       dispatch(signin(email, password))
   }

    

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li><h2>Sign-In</h2></li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label for="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                </li>
                <li>
                    <label for="password">
                        Password
                    </label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                </li>
                <li>
                    <button type="submit" className="button primary">Sign in</button>

                </li>
                <li>
                    New to React shopping cart?
                </li>
                <li>
                    <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your amazona account</Link>
                </li>
            </ul>
        </form>

            

            
         </div>
}

export default SigninScreen;