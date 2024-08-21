
"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; 

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function LoginPage() {
    const router = useRouter();
    const apiUrl = 'http://44.202.26.131:8000/login/'; 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleLogin = async () => {
        let hasError = false;

        if (username === '') {
            setUsernameError('Please enter username');
            hasError = true;
        } else {
            setUsernameError('');
        }

        if (password === '') {
            setPasswordError('Please enter password');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (!hasError) {
            try {
                const response = await axios.post(`${apiUrl}`, {
                    email: username,
                    password: password
                });

                if (response.status === 200) {
                    router.push('/skill-home');
                }
            } catch (error) {
                console.error('Error details:', error);

                if (error.response) {
                    console.error('Error response:', error.response);

                    if (error.response.status === 404) {
                        setLoginError('The endpoint is not found. Please check the API URL.');
                    } else if (error.response.status === 401) {
                        setLoginError('Invalid username or password');
                    } else {
                        setLoginError(`Error ${error.response.status}: ${error.response.data.message || 'An error occurred. Please try again.'}`);
                    }
                } else {
                    setLoginError('An error occurred. Please try again.');
                }
            }
        }
    };

    return (
        <main className="flex flex-col md:flex-row min-h-screen">
  
            <div className='flex-1 flex justify-center items-center p-5 md:p-10'>
                <div className='flex flex-col items-center'>
                    <img className='mb-6 w-9/12' src="/skillcapital.png" alt="Logo" />
                    <div className='border-inherit border-2 rounded-md shadow-lg p-6 md:w-4/5'>
                        <label className='font-normal text-sm'>Email</label>
                        <TextField
                            fullWidth
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={!!usernameError}
                            helperText={usernameError}
                        />

                        <label className='font-normal text-sm mt-4'>Password</label>
                        <TextField
                            type="password"
                            fullWidth
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!passwordError}
                            helperText={passwordError}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            className='mt-10 mb-5 bg-gradient-to-r from-orange-300 to-pink-500'
                            onClick={handleLogin}
                        >
                            Login
                        </Button>

                        {loginError && <div style={{ color: '#E22449', fontSize: '15px' }}>{loginError}</div>}

                        <div className='flex items-center mt-4'>
                            <Checkbox {...label} />
                            <span className='text-slate-600 ms-2'>Remember Me</span>
                        </div>
                        <p className='text-slate-600 text-center mt-20'>©2024, All rights reserved</p>
                    </div>
                </div>
            </div>
            <div className='flex-1 flex flex-col justify-center items-center p-5 md:p-10'>
                <div className=''>
                    <h1 className='text-4xl font-bold text-center text-DarkBlue-800 mb-4'>Seamlessly manage all learner data in a unified platform.</h1>
                    <p className='text-lg text-center font-light text-customBlue mb-6'>Centralize customer data effortlessly. Streamline communication, sales, and support for seamless growth.</p>
                    <Image className='w-full'
                        src="/1 Skill Capital - Login Page Image (1).png  "
                        alt="Login Page Visual"
                        width={800} 
                        height={400} 
                      
                    />
                </div>
            </div>
        </main>
    );
}

