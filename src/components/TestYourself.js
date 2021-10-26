import React, {useEffect, useState} from 'react';
import TestLine from "./TestLine";
import {FcRefresh} from "react-icons/fc";
import firebase from "../Config";

const TestYourself = ({fiveForTest, setFiveForTest, db}) => {
const [fiveRandomVerbs, setFiveRandomVerbs] = useState('')
let mistakenVerbs = []

    useEffect(() => {
    return () => {
            mistakenVerbs.forEach(mistake => {
            let mistakes = 0
            const verbRef = firebase.database().ref('Verbs').child(mistake.id)
            verbRef.on('value', (res) => {
                mistakes = res.val().mistakes
            })
            verbRef.update({mistakes: mistakes+1})
        })
        mistakenVerbs = []
    }}, [])

    const newMistake = (verb) => {mistakenVerbs.push(verb)}

    return (
        <div className='commonMistakesMobile'><h1 className='hebrewFont newVerbsFirstRow'>Test yourself <FcRefresh data-toggle="tooltip" title='Refresh verbs' className='forPointer' onClick={() => {
            const temp = db.sort(() => Math.random() - 0.5).map((verb, index) => {
                if (index < 5) return verb
            })
            temp.length = 5
            setFiveForTest(temp)
            console.log(mistakenVerbs)
        }}/></h1>
            {!fiveRandomVerbs ? fiveForTest.length ? fiveForTest.map((verb, index) => <TestLine fiveForTest={fiveForTest} fiveRandomVerbs={fiveRandomVerbs} newMistake={newMistake} verb={verb} key={index}/>) :
                <h4>loading...</h4> : fiveRandomVerbs.map((verb, index) => <TestLine fiveForTest={fiveForTest} fiveRandomVerbs={fiveRandomVerbs} newMistake={newMistake} verb={verb} key={index}/>)}
        </div>
    );
};

export default TestYourself;