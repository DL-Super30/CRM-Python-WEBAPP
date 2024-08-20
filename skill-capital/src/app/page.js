"use client";
import * as React from 'react';
import Image from 'next/image'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function LoginPage() {
    const router = useRouter()
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
                const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                    "username" : username,
                    "password" : password
                });
                if (response.status === 200) {
                    router.push('/dashboard')
                    console.log(response.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Error response:', error.response);
                    setLoginError('Invalid username or password');
                } else {
                    setLoginError('An error occurred. Please try again.');
                }
            }
        }
    };
    return (
        <main>
            <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <div className='md:ms-28 ms-5'>
                    <img className='md:ms-20 ms-5 mb-10 w-3/4 md:w-auto' src="/skillcapital.png" alt="Logo"></img>
                    <div className='border-inherit border-2 rounded-md shadow-lg p-6 w-full md:w-10/12 mt-5 md:ms-10'>
                        <label className='font-normal text-sm'>User Name</label>
                        <TextField
                            fullWidth
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {usernameError && <div style={{ color: '#E22449',fontSize:'15px' }}>{usernameError}</div>}
                        <label className='font-normal text-sm'>Password</label>
                        <TextField
                            type="password"
                            fullWidth
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <div style={{ color: '#E22449',fontSize:'15px' }}>{passwordError}</div>}
                        <Button
                            fullWidth
                            variant="contained"
                            className='mt-10 mb-5 bg-gradient-to-r from-orange-300 to-pink-500'
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                        {loginError && <div style={{ color: '#E22449', fontSize: '15px' }}>{loginError}</div>}
                        <div className='flex items-center'>
                            <Checkbox {...label} />
                            <span className='text-slate-600'>Remember Me</span>
                        </div>
                        <p className=' text-slate-600 text-center mt-20'>©2024, All rights reserved</p>
                    </div>
                </div>
                <div className='w-1.9/3 left-[50%] mt-10'>
                    <div className='mt-12 ms-15'>
                        <h1 className='text-3xl font-bold w-3/4 text-center text-customBlue ps-10 ms-4'>Seamlessly manage all learner data in a unified platform.</h1>
                        <p className='text-lg w-3/4 text-center font-light text-customBlue ms-10 lg:ms-14'>Centralize customer data effortlessly. Streamline communication, sales, and support for seamless growth.</p>
                    </div>
                    <img className='mt-10' src="/skill.png"></img>
                </div>
            </div>
        </main>
    );
}