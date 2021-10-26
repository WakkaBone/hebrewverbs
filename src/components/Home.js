import React from 'react';
import Navigation from "./Navigation";
import Login from "./Login";

const Home = ({currentUser, mode, setCurrentUser, setMode}) => {
    return (
        <div>{currentUser ? '' : ''}<div className='toCenter'>{currentUser ?
            <div className='welcomeMessage hebrewFont'>{currentUser ? <div><h3>Welcome, {currentUser}</h3></div> : ''}
                <p/>
                <h2 className='hebrewFont'>What would you like to do?</h2></div>
            : <div><h1 className='hebrewFont'>שלום חברים</h1><p>This application is for Hebrew learners. <br/>I know that learning rules of verbs conjugation in Hebrew is a tough one, so I made this app for you.<br/> Here you can add the verbs you would like to learn and test yourself.<br/>But first you need to sign up or sign in. </p></div>}</div>
            {currentUser ? <Navigation mode={mode} currentUser={currentUser} setCurrentUser={setCurrentUser} setMode={setMode}/> : ''}
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </div>
    );
};

export default Home;