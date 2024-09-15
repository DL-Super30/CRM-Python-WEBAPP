
// "use client";
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Checkbox from '@mui/material/Checkbox';
// import { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image'; 

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// export default function LoginPage() {
//     const router = useRouter();
//     const apiUrl = 'https://api.raghava.site/login/'; 
//     const [Email, setEmail] = useState('');
//     // const [username, setusername] = useState('');

//     const [password, setPassword] = useState('');
//     const [EmailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');

//     const handleLogin = async () => {
//         let hasError = false;

//         if (Email === '') {
//             setEmailError('Please enter username');
//             hasError = true;
//         } else {
//             setEmailError('');
//         }

//         if (password === '') {
//             setPasswordError('Please enter password');
//             hasError = true;
//         } else {
//             setPasswordError('');
//         }

//         if (!hasError) {
//             try {
              
//                 const formData = new URLSearchParams({
//                     'Email': Email,
//                     'password': password
//                 });

//                 const response = await axios.post(apiUrl, formData, {
//                     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//                 });

//                 if (response.status === 200) {
//                     router.push('/skill-home');
//                 }
//             } catch (error) {
//                 console.error('Error details:', error);

//                 if (error.response) {
//                     console.error('Error response:', error.response);

//                     if (error.response.status === 422 && error.response.data) {
//                         const details = error.response.data.detail;
//                         if (Array.isArray(details)) {
//                             setLoginError(`Validation Errors: ${details.join(', ')}`);
//                         } else {
//                             setLoginError('An unknown validation error occurred.');
//                         }
//                     } else if (error.response.status === 404) {
//                         setLoginError('The endpoint is not found. Please check the API URL.');
//                     } else if (error.response.status === 401) {
//                         setLoginError('Invalid email or password');
//                     } else {
//                         setLoginError(`Error ${error.response.status}: ${error.response.data.message || 'An error occurred. Please try again.'}`);
//                     }
//                 } else {
//                     setLoginError('An error occurred. Please try again.');
//                 }
//             }
//         }
//     };

//     return (
//         <main className="flex flex-col md:flex-row min-h-screen">
//             <div className='flex-1 flex justify-center items-center p-5 md:p-10'>
//                 <div className='flex flex-col items-center'>
//                     <Image
//                         className='mb-6 w-9/12'
//                         src="/skillcapital.png"
//                         alt="Logo"
//                         width={300}
//                         height={100}
//                     />
//                     <div className='border-inherit border-2 rounded-md shadow-lg p-6 md:w-4/5'>
//                         <label className='font-normal text-sm'>Email</label>
//                         <TextField
//                             fullWidth
//                             id="Email"
//                             value={Email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             error={!!EmailError}
//                             helperText={EmailError}
//                         />

//                         <label className='font-normal text-sm mt-4'>Password</label>
//                         <TextField
//                             type="password"
//                             fullWidth
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             error={!!passwordError}
//                             helperText={passwordError}
//                         />

//                         <Button
//                             fullWidth
//                             variant="contained"
//                             className='mt-10 mb-5 bg-gradient-to-r from-orange-300 to-pink-500'
//                             onClick={handleLogin}
//                         >
//                             Login
//                         </Button>

//                         {loginError && <div style={{ color: '#E22449', fontSize: '15px' }}>{loginError}</div>}

//                         <div className='flex items-center mt-4'>
//                             <Checkbox {...label} />
//                             <span className='text-slate-600 ms-2'>Remember Me</span>
//                         </div>
//                         <p className='text-slate-600 text-center mt-20'>©2024, All rights reserved</p>
//                     </div>
//                 </div>
//             </div>
//             <div className='flex-1 flex flex-col justify-center items-center p-5 md:p-10'>
//                 <div className="max-w-[1600px] mx-auto">
//                     <h1 className='text-4xl font-bold text-center mb-4 text-[rgb(4,45,96)]'>Seamlessly manage all learner data in a unified platform.</h1>
//                     <p className='text-xl text-center font-normal mb-6 text-[rgb(4,45,96)]'>Centralize customer data effortlessly. Streamline<br/> communication, sales, and support for seamless growth.</p>
//                     <Image 
//                         className="w-auto"
//                         src="/1 Skill Capital - Login Page Image (1).png"
//                         alt="Login Page Visual"
//                         width={900}
//                         height={900}
//                     />
//                 </div>
//             </div>
//         </main>
//     );
// }

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
    const apiUrl = 'http://127.0.0.1:8000/login'; // Ensure this is the correct URL
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleLogin = async () => {
        let hasError = false;

        // Validate email
        if (Email === '') {
            setEmailError('Please enter email');
            hasError = true;
        } else {
            setEmailError('');
        }

        // Validate password
        if (password === '') {
            setPasswordError('Please enter password');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (!hasError) {
            try {
                const formData = {
                    username: Email,  // Use 'username' for the FastAPI endpoint
                    password: password
                };

                const response = await axios.post(apiUrl, formData, {
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.status === 200) {
                    router.push('/skill-home');
                } else {
                    setLoginError('Unexpected response status');
                }
            } catch (error) {
                console.error('Error details:', error);

                if (error.response) {
                    console.error('Error response:', error.response);

                    if (error.response.status === 422 && error.response.data) {
                        const details = error.response.data.detail;
                        if (Array.isArray(details)) {
                            setLoginError(`Validation Errors: ${details.join(', ')}`);
                        } else {
                            setLoginError('An unknown validation error occurred.');
                        }
                    } else if (error.response.status === 404) {
                        setLoginError('The endpoint is not found. Please check the API URL.');
                    } else if (error.response.status === 401) {
                        setLoginError('Invalid email or password');
                    } else if (error.response.status === 301) {
                        setLoginError('The endpoint has been moved. Please check the new URL.');
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
                    <Image
                        className='mb-6 w-9/12'
                        src="/skillcapital.png"
                        alt="Logo"
                        width={300}
                        height={100}
                    />
                    <div className='border-inherit border-2 rounded-md shadow-lg p-6 md:w-4/5'>
                        <label className='font-normal text-sm'>Email</label>
                        <TextField
                            fullWidth
                            id="Email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!EmailError}
                            helperText={EmailError}
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
                <div className="max-w-[1600px] mx-auto">
                    <h1 className='text-4xl font-bold text-center mb-4 text-[rgb(4,45,96)]'>Seamlessly manage all learner data in a unified platform.</h1>
                    <p className='text-xl text-center font-normal mb-6 text-[rgb(4,45,96)]'>Centralize customer data effortlessly. Streamline<br/> communication, sales, and support for seamless growth.</p>
                    <Image 
                        className="w-auto"
                        src="/1 Skill Capital - Login Page Image (1).png"
                        alt="Login Page Visual"
                        width={900}
                        height={900}
                    />
                </div>
            </div>
        </main>
    );
}

