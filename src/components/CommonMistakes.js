import React, {useEffect} from 'react';
import CommonMistakesLine from "./CommonMistakesLine";
import firebase from "../Config";

const CommonMistakes = ({db, currentUser}) => {
    let mistakenVerbs = []
    const newMistake = (verb) => {mistakenVerbs.push(verb)}

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

    return (
        <div className='commonMistakesMobile'><h1 className='hebrewFont newVerbsFirstRow'>Common mistakes</h1>
            {db.length ? db.filter(verb => verb.relatedUser === currentUser).sort((a, b) => a.mistakes < b.mistakes ? 1 : -1).map((verb, index) => {
                    if (index < 5) return <CommonMistakesLine newMistake={newMistake} verb={verb} key={index}/>
                }) :
                <h4>loading...</h4>}</div>
    );
};

export default CommonMistakes;