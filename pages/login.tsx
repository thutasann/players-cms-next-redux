import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../slices/userSlice';
import { useRouter } from 'next/router';


const Login = () => {
    const router = useRouter();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const loginSubmit = (e) => {
        e.preventDefault();
        if(user === "" || user === undefined || email === "" || email === undefined){
            alert("Please enter all information");
        }
        else {
            try{
                setLoading(true);
                dispatch(login({
                    displayName: name,
                    email: email
                }));
                setLoading(false);
            }
            catch(err){
                setLoading(false);
                console.error("SOMETHING WENT WRONG. Error Detail is ==> ", err);
            }
        }
    };

    useEffect(() => {
        if(user){
            router.push("/")
        } 
    }, [user]);

    return (
        <div
            
        >
            <Head>
                <title>Login | Player CMS</title>
                <link rel="icon" type="image/png" href="/logo.jpeg" sizes="16x16" />
            </Head>

            <form
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '1180px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '50px',
                    paddingLeft: "30px",
                    paddingRight: "30px"
                }}
            >

                    <Link href="/">
                        🏠 Back Home 
                    </Link>

                    <label style={{marginTop: '30px'}}>User Name</label>
                    <input
                        type="text"
                        value={name}
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            marginBottom: "30px",
                        }}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        onClick={loginSubmit}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
            </form>
        </div>
    )
}

export default Login