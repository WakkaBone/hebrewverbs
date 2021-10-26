import React from 'react';
import NewVerb from "./NewVerb";
import AllVerbs from "./AllVerbs";
import TestYourself from "./TestYourself";
import CommonMistakes from "./CommonMistakes";
import Home from "./Home";

const Main = ({allVerbs, mode, db, deleteVerb, fiveForTest, setMode, currentUser, setCurrentUser, addVerb, setFiveForTest}) => {
    if (mode === '') return <Home currentUser={currentUser} setCurrentUser={setCurrentUser} mode={mode} setMode={setMode}/>
    if (mode === 'addNewVerb') return <NewVerb currentUser={currentUser} db={db}/>
    if (mode === 'viewAllVerbs') return <AllVerbs addVerb={addVerb} allVerbs={allVerbs} db={db} deleteVerb={deleteVerb} currentUser={currentUser}/>
    if (mode === 'testYourself') return <TestYourself db={db} fiveForTest={fiveForTest} setFiveForTest={setFiveForTest}/>
    if (mode === 'commonMistakes') return <CommonMistakes db={db} currentUser={currentUser}/>
};

export default Main;