import React, {useState} from 'react';
import {AiOutlinePlusCircle} from "react-icons/ai"
import {FiDelete} from "react-icons/fi";
import firebase from "../Config";

const VerbLineAdmin = ({verb, index, addVerb, setSearchResult, allVerbs, db}) => {
    const [added, setAdded] = useState(() => db.map(item => item.verb).includes(verb.verb) ? true : false)
    const deleteVerb = id => {
        let verbRef = firebase.database().ref('Verbs').child(id)
        verbRef.remove()
        verbRef = firebase.database().ref('Verbs')
        verbRef.on('value', (res) => {
            const allVerbs = res.val()
            const allVerbsEnglish = []
            const allVerbsInfinitive = []
            const allVerbsFirstForm = []
            const allVerbsInfinitiveTranscriptions = []
            const allVerbsFirstFormTranscriptions = []
            const ids = []
            const mistakesArr = []
            const relatedUsers = []
            for (let id in allVerbs) ids.push(id)
            for (let verbEnglish in allVerbs) allVerbsEnglish.push(allVerbs[verbEnglish].verb)
            for (let verbInfinitive in allVerbs) allVerbsInfinitive.push(allVerbs[verbInfinitive].infinitive)
            for (let verbFirstForm in allVerbs) allVerbsFirstForm.push(allVerbs[verbFirstForm].firstForm)
            for (let verbInfinitive in allVerbs) allVerbsInfinitiveTranscriptions.push(allVerbs[verbInfinitive].transcriptionInfinitive)
            for (let verbFirstForm in allVerbs) allVerbsFirstFormTranscriptions.push(allVerbs[verbFirstForm].transcriptionFirstForm)
            for (let mistakes in allVerbs) mistakesArr.push(allVerbs[mistakes].mistakes)
            for (let user in allVerbs) relatedUsers.push(allVerbs[user].relatedUser)
            const complete = []
            for (let i = 0; i < allVerbsEnglish.length; i++) complete.push({
                id: ids[i],
                verb: allVerbsEnglish[i],
                infinitive: allVerbsInfinitive[i],
                firstForm: allVerbsFirstForm[i],
                transcriptionInfinitive: allVerbsInfinitiveTranscriptions[i],
                transcriptionFirstForm: allVerbsFirstFormTranscriptions[i],
                mistakes: mistakesArr[i],
                relatedUser: relatedUsers[i]
            })
            setSearchResult(complete)
        })}

        return (
            <tr className={`tableRow ${index % 2 ? "rowOne" : "rowTwo"}`}>
                <td className='tableAdminFirst'>{verb.verb}</td>
                <td data-toggle="tooltip" title={verb.transcriptionInfinitive}
                    className='tableAdminSecond'>{verb.infinitive}</td>
                <td data-toggle="tooltip" title={verb.transcriptionFirstForm}
                    className='tableAdminThird'>{verb.firstForm}</td>
                <td className='tableAdminFouth'><FiDelete className='forPointer' data-toggle="tooltip"
                                                          title='Delete the verb' onClick={() => deleteVerb(verb.id)}/>
                </td><td>
                {added ? <AiOutlinePlusCircle data-toggle="tooltip" title='You already have this verb in your collection' className={`${added ? 'added' : ''}`}/> : <AiOutlinePlusCircle className={`forPointer ${added ? 'added' : ''}`} data-toggle="tooltip" title='Add to my verbs' onClick={() => {
                    addVerb(verb.verb, verb.infinitive, verb.firstForm, verb.transcriptionInfinitive, verb.transcriptionFirstForm)
                    setAdded(true)
                }}/>}</td>
            </tr>
        );
    };
export default VerbLineAdmin;