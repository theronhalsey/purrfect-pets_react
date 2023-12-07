import React from "react";
import { useState,useEffect, useRef } from "react";
import './Account.scss'
import SideBar from "./Sidebar";
import FaceIcon from '@mui/icons-material/Face';
import bcrypt from 'bcryptjs';
import {render} from 'react-dom';


function Account(){

    const hasRender = useRef(false);

    
    

    //original user info on the page
    const [userName, getUsername] = useState('')
    const [email, getEmail] = useState('')
    const [userID, getUserID] = useState('')
    const [password, getPassword] = useState('')
    const [salt, getSalt] = useState('')
    

    
    //user info added to the input boxes

    const [newUsername, setNewUsername] = useState('')
    const [newEmail,setNewEmail] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [verifyNewPassword, checkVerifyNewPassword] = useState('')

    //send these to the DB
    const[updateUsername, setUpdateUsername] = useState('')
    const[updateEmail, setUpdateEmail] = useState('')
    const [newHash, setNewHash] = useState('')

    //salt for the new password
    const [newSalt,setNewSalt] = useState('')

    
    
    //displays a textbox accordingly
    const[validUsername, setValidUsername] = useState(true)
    const[validEmail, setValidEmail] = useState(true)
    const[validPassword, setValidPassword] = useState(true)
    



    const[inModal, setInModal] = useState(false)

    //store the onChange values
    const usernameOnChange= (event) => {
        setNewUsername(event.target.value)
    }
    const emailOnChange = (event) => {
        setNewEmail(event.target.value)
    }

    const passwordOnChange = (event) => {
        setNewPassword(event.target.value)
    }
    const password2OnChange = (event) => {
        checkVerifyNewPassword(event.target.value)
    }


    //if the input boxes are empty, then the data will remain unchanged
    //setting the 'new' variables to the original variables
    const handleCancel = () => {
        setNewUsername('')
        setNewEmail('')
        setNewPassword('')
        checkVerifyNewPassword('')

        setValidUsername(true)
        setValidEmail(true)
        setValidPassword(true)
        toggleModal()

    }

    const handleSave =  () => {

        console.log('handleSaved Called')
        

        //return a boolean if the email or username is available
        if (newUsername === ''){
            setValidUsername(true)
        }
        if (newEmail === ''){
            setValidEmail(true)
        }

        if(newPassword !== verifyNewPassword){
            setValidPassword(false)
        }
        else if (newPassword === verifyNewPassword){
            setValidPassword(true)
            
        } 


    }


    const validInfo =  () => {

        console.log("validInfo called")
        console.log(validUsername,validEmail,validPassword)
        if (validUsername && validEmail&& validPassword){
            console.log('everything is valid')
            
            sessionStorage.setItem("userinfo", updateEmail);
            console.log(newEmail,'new email')
            updateInfo();
            toggleModal()
            setNewUsername('')
            setNewEmail('')
            setNewPassword('')
            checkVerifyNewPassword('')
            window.location.reload(false);
            
        }
    }
    useEffect(() => {

        if (!render.current) {

        if (newUsername === ''){
            setValidUsername(true)
            setUpdateUsername(userName)

        }

        if (newEmail === ''){
            setValidEmail(true)
            setUpdateEmail(email)
        }

        if(newPassword === ''){
            setNewSalt(salt)
            setNewHash(password)
        }

        else if (newPassword !== ''){
             //hash the password
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(newPassword,salt)
            setNewHash(hash)
            setNewSalt(salt)
            
        }  
    }


    }, [validPassword,newPassword,updateUsername,updateEmail,handleSave]);




    //display the update modal
    const [modal,setModal] = useState(false)
    const toggleModal = () =>{
        setModal(!modal)
    }
    //stops the page from scrolling when the modal is displayed
    if(modal) {
        document.body.classList.add('active-modal')
        } else {
        document.body.classList.remove('active-modal')
        }
    

    //fetch user data from database
    let userEmail =  sessionStorage.getItem("userinfo");

    useEffect(() => {
        if (!hasRender.current) {
            const fetchUserData = async () => {
            try {
                const response = await fetch(`/users/userInfo/${userEmail}`,{method: 'GET'});
                const userData = await response.json()
                console.log('User Data:', userData)
                getUsername(userData.username)
                getEmail(userData.email)
                getUserID(userData.id)
                getPassword(userData.password)
                getSalt(userData.salt)
                setUpdateEmail(userData.email)
                setUpdateUsername(userData.username)
            } catch (error) {
            console.error('Error fetching user data:', error)
            }
            }
            fetchUserData()
            hasRender.current = true;

        }
    
        try{
            //check if username is available

            if(inModal){
                if(newUsername !== ''){
                    const checkUsernameAvailability = async () => {
                        try {
                            const response = await fetch (`/users/checkusername/${newUsername}`,{method: 'GET'})
                            const data  = await response.json()
                            setValidUsername(data)
                            if(data){
                                setUpdateUsername(newUsername)
                            }

                        }
                        catch (error) {
                            console.error('Error checking username availability:', error)
                            }
                        }
                        checkUsernameAvailability()
                    }
                    
            if(newEmail !== ''){
                //check if email is available
                const checkEmailAvailability = async () => {
                    try{
                        const response = await fetch (`/users/checkemail/${newEmail}`,{method: 'GET'})
                        const data = await response.json()
                        setValidEmail(data)
                        if(data){
                            setUpdateEmail(newEmail)
                        }
                    }
                    catch (error) {
                        console.error('Error checking email availability:', error)
                    }
                }
                checkEmailAvailability()

            }
            if(newPassword !== verifyNewPassword){
                setValidPassword(false)
            }
            else if (newPassword === verifyNewPassword){
                setValidPassword(true)
                
            }
            
            }
        }
        
        catch (error){
            console.error('Error fetching user data:', error)
        }

        })




    //update user data
    const updateInfo = async () => {
        try{

            let option = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },

                body: JSON.stringify({
                    'id': userID,
                    'username': updateUsername,
                    'email': updateEmail,
                    'password': newHash,
                    'salt': newSalt,
                })
            }
        
            const response = await fetch(`/users/id/${userID}`,option)
            const data = await response.json()
            console.log('User Data:', data)
        } 
        catch (error) {  
            console.error('Error updating user data:', error)
        }
    }
        
    return (
    <div className="account-container">
        <SideBar />
        <div className="account">
            <div className="account-user">
                <div className="account-pic-container">
                    <div className="account-pic">
                    <FaceIcon sx={{ fontSize: 150 }}/> 
                    </div>

                </div>
                <div className="account-user-info">
                    <div className="userName-container">
                        <p>Username:</p>
                        <div className="account-username"><h2>{userName}</h2></div>
                    </div>
                    <div className="userName-container">
                        <p>Email:</p>
                        <div className="account-username"><h2>{email}</h2></div>
                    </div>
                </div>

                <button onClick={()=>{
                    toggleModal();
                    setInModal(true);
                }} className="btn-modal">
                Edit Profile
                </button>

                {/* show and hide the update modal  */}
                {modal && (
                <div className="modal">
                    <div onClick={handleCancel} className="overlay"></div>
                    <div className="modal-content">
                    <h2>Update Info</h2>
                    <p>Leave fields blank if want to remain unchanged</p>
                    <div className="update-info-div">

                        <input
                        name="username-input"
                        className="update-input-box"
                        type="text"
                        placeholder='username'
                        value={newUsername}
                        onChange={usernameOnChange}/>
                        {validUsername ? null : <p className="error-message">username is not available</p>}
                        
                        <input 
                        name="email-input"
                        className="update-input-box"
                        type="text" 
                        placeholder='email'
                        value={newEmail}
                        onChange={emailOnChange}/>
                        {validEmail ? null : <p className="error-message">email is not available</p>}

                        <input 
                        name="password-input"
                        className="update-input-box"
                        type="password"
                        placeholder="password" 
                        value={newPassword}
                        onChange={passwordOnChange}/>

                        <input
                        name="password2-input"
                        className="update-input-box"
                        type="password"
                        placeholder="reenter password"
                        onChange={password2OnChange} />
                        {validPassword ? null : <p className="error-message">passwords do not match</p>}


                    </div>

                    <button className="save-modal" onClick={()=>{
                        handleSave();
                        validInfo()

                    

                        
                    }}>
                    save</button>
                    <button className="close-modal" onClick={()=>{
                        handleCancel();
                        setInModal(false);
                    }}>
                        cancel
                    </button>

                    </div>
                </div>
                )}

            </div>


            <div className="account-more-info">
                <div className="account-more-info-container">
                    <h2>More Info</h2>
                    <h3>PurrfectPets is powered PetFinder</h3>
                    <p>To learn more about PetFinder, <a href="https://www.petfinder.com/" target="blank">click here!</a></p>
                    <br />
                    <h3>Have a candidate for PurrfectPets?</h3>
                    <p>Do you or someone you know have a pet that is in need of their perfect owner?</p>
                    <p>PetFinder has resources that can help a pet find a new home</p>
                    <p>To learn more about rehoming a pet,  <a href="https://www.petfinder.com/adopt-or-get-involved/adopting-pets/rehoming/" target="blank">click here!</a></p>



                </div>

            </div>

        </div>

    </div>
    )

    }




export default Account;

