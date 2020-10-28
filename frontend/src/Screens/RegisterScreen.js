import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { register } from '../actions/userActions';
function SigninScreen(props) {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); // useState returns a pair: current state value and function to update it. intial state is empty
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    const userRegister = useSelector(state=>state.userRegister);
    const {loading, userInfo, error} = userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
        return () => {
    
        }
    }, [userInfo]) //If userInfo state changes, useEffect runs again.

   const submitHandler = (e) => {
       e.preventDefault() // Don't refresh screen when user clicks on signin
       dispatch(register(name, email, password))
       
   }

    

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li><h2>Create account</h2></li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label for="Name">
                        Name
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}/>
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
                    <label for="repassword">
                        repassword
                    </label>
                    <input type="password" name="repassword" id="repassword" onChange={(e) => setRePassword(e.target.value)}/>
                </li>
                <li>
                    Already have an account? <Link to="/signin">Sign-in</Link>

                </li>
                <li>
                    <button type="submit" className="button primary">Register</button>

                </li>
                
            </ul>
        </form>

            

            
         </div>
}

export default SigninScreen;