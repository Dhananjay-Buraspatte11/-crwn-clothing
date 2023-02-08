import { useState } from 'react';

import FormInput from '../form-input/FormInput';
import Button from '../button/Button';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from '../../utils/firebase/FirebaseUtils';

import './signUpForm.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };
    return (
        <div>
        <h2>Don't have an account?</h2>
            <span className='sign-up-container'>Sign in with your Email and Password</span>
            <form action="" onSubmit={handleSubmit}>
                
                <FormInput label="Display Name"  type="text"  name="displayName" id="" required onChange={handleChange} value={displayName}  />
           
                <FormInput label="Email" type="email"  name="email" id="" required onChange={handleChange} value={email}  />
                          
                <FormInput label="Password" type="password"  name="password" id="" required onChange={handleChange} value={password}  />
                            
                <FormInput label="Confirm Password" type="password"  name="confirmPassword" id="" required onChange={handleChange} value={confirmPassword} />
               
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}
export default SignUpForm;