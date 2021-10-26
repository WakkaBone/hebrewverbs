import React, {useState} from 'react';
import firebase from "../Config";

const NewVerb = ({db, currentUser}) => {
    const [verb, setVerb] = useState('')
    const [infinitive, setInfinitive] = useState('')
    const [firstForm, setFirstForm] = useState('')
    const [transcriptionInfinitive, setTranscriptionInfinitive] = useState('')
    const [transcriptionFirstForm, setTranscriptionFirstForm] = useState('')
    const [message, setMessage] = useState('')
    const [verbAddedMessage, setVerbAddedMessage] = useState('')
    const handleVerbChange = (e) => {
        setMessage('')
        setVerbAddedMessage('')
        setVerb(e.target.value)
    }
    const handleTranscriptionInfinitiveChange = (e) => {
        setMessage('')
        setVerbAddedMessage('')
        setTranscriptionInfinitive(e.target.value)
    }
    const handleTranscriptionFirstFormChange = (e) => {
        setMessage('')
        setVerbAddedMessage('')
        setTranscriptionFirstForm(e.target.value)
    }
    const handleInfinitiveChange = (e) => {
        setMessage('')
        setVerbAddedMessage('')
        setInfinitive(e.target.value)
    }
    const handleFirstFormChange = (e) => {
        setMessage('')
        setVerbAddedMessage('')
        setFirstForm(e.target.value)
    }

    const handleAddVerb = () => {
        if (!verb || !infinitive || !firstForm || !transcriptionInfinitive || !transcriptionFirstForm) setMessage('Fill all the blanks!')
        else if (db.map(verb => verb.infinitive).includes(infinitive) || db.map(verb => verb.firstForm).includes(firstForm)) setMessage('This verb is already in the database.')
        else {
            const testRef = firebase.database().ref('Verbs')
            const newVerb = {verb, infinitive, firstForm, transcriptionInfinitive, transcriptionFirstForm, mistakes: 0, relatedUser: currentUser}
            testRef.push(newVerb)
            setVerb('')
            setInfinitive('')
            setFirstForm('')
            setTranscriptionInfinitive('')
            setTranscriptionFirstForm('')
            setVerbAddedMessage('Your verb has been successfully added!')
        }
    }
    return (
        <div className='commonMistakesMobile'>
        <div><div className='thanks'/>
            <h1 className='hebrewFont newVerbsFirstRow'>Add a new verb</h1>
            <div className='containerNewVerbs'>
                <div className='oneLineInputMobile'><input className='newVerbsFirstRow' type='text' onChange={handleVerbChange} placeholder='Verb in English' value={verb}/></div>
                <div className='oneLineInputMobile'><input className='newVerbsSecondRow' type='text' onChange={handleInfinitiveChange} placeholder='Infinitive' value={infinitive}/>
                    <input className='newVerbsSecondRow' type='text' onChange={handleFirstFormChange} placeholder='Present male singular' value={firstForm}/></div>
                <div className='oneLineInputMobile'><input className='newVerbsSecondRow' type='text' onChange={handleTranscriptionInfinitiveChange} placeholder='Infinitive transcription' value={transcriptionInfinitive}/>
                    <input className='newVerbsSecondRow' type='text' onChange={handleTranscriptionFirstFormChange} placeholder='Present male singular transcription' value={transcriptionFirstForm}/></div>
            </div>
            <button className='newVerbsFirstRow buttonAddVerb hebrewFont' onClick={handleAddVerb}>ADD VERB</button><br/>
            <span className='message'>{message}</span>
            <span className='messageCorrect'>{verbAddedMessage}</span>
        </div>
        </div>
    );
};

export default NewVerb;