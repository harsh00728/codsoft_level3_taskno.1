import React,{useState}  from 'react'
import {Box, AppBar, Toolbar, Button, Typography, Tabs, Tab} from '@mui/material'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../redux/store'
import toast from 'react-hot-toast';

const Header = () => {
    //Global state
    let isLogin= useSelector((state) => state.isLogin);
    isLogin= isLogin || localStorage.getItem('userId');
    const dispatch= useDispatch();
    const navigate= useNavigate();

    // state
    const [value, setValue] = useState();

    // handleLogout
    const handleLogout= ()=> {
        try{
            dispatch(authActions.logout());
            toast.success('Logout Successfully');
            navigate('/Login');
            localStorage.clear();
        } catch(err){
            console.log(err);
        }
    }

    return (
    <>
        <AppBar position='sticky'>
            <Toolbar>
                <Typography variant='h4'> My Blog App </Typography>
                {isLogin && (
                    <Box display={'flex'} marginLeft={"auto"} marginRight={"auto"} >
                    <Tabs textColor='inherit' value={value} onChange={(e, val)=> setValue(val)} >
                        <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                        <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                        <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />
                    </Tabs>
                </Box>
                )}
                <Box display={'flex'} marginLeft="auto">
                    {!isLogin && (<>
                            <Button sx={{margin:1, color:'white' }} LinkComponent={Link} to="/login">Login</Button>
                            <Button sx={{margin:1, color:'white' }} LinkComponent={Link} to="/register">Register</Button>
                        </>
                    )}
                    {isLogin && (
                        <Button sx={{margin:1, color:'white' }} onClick={handleLogout} >Logout</Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Header