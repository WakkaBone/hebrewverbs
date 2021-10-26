import React from 'react';
import {auth} from "../Config";

const Navigation = ({mode, setMode, currentUser, setCurrentUser}) => {
    return (
        <div className={!mode ? 'navigationBarTest' : 'navigationBar'}>
            <button className='buttonTest' onClick={() => setMode('addNewVerb')}>Add a verb</button>
            <button className='buttonTest' onClick={() => setMode('viewAllVerbs')}>My verbs</button>
            <button className='buttonTest' onClick={() => setMode('testYourself')}>Test yourself</button>
            <button className='buttonTest' onClick={() => setMode('commonMistakes')}>Common mistakes</button>
            {currentUser ? <button className='buttonTest' onClick={() => {
                setCurrentUser('')
                setMode('')
                auth.signOut()
            }}>Sign out</button> : ''}
        </div>
    );
};

export default Navigation;