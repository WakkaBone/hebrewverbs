import './App.css';
import React, {useEffect, useState} from "react";
import firebase, {auth} from "./Config"
import Main from "./components/Main";
import Navigation from "./components/Navigation";

function App() {
    const [db, setDb] = useState({})
    const [fiveForTest, setFiveForTest] = useState([])
    const [mode, setMode] = useState('')
    const [currentUser, setCurrentUser] = useState('')
    const [allVerbs, setAllVerbs] = useState([])

    const addVerb = (verb, infinitive, firstForm, transcriptionInfinitive, transcriptionFirstForm) => {
        if(!db.map(verb => verb.infinitive).includes(infinitive)){
            const testRef = firebase.database().ref('Verbs')
            const newVerb = {verb, infinitive, firstForm, transcriptionInfinitive, transcriptionFirstForm, mistakes: 0, relatedUser: currentUser}
            testRef.push(newVerb)
            alert(`You added "${verb}" to your collection`)
        } else alert('You already have this verb in your collection')
    }

    const deleteVerb = id => {
        const verbRef = firebase.database().ref('Verbs').child(id)
        verbRef.remove()
    }

    useEffect(() => {
        if(!currentUser) {
            auth.onAuthStateChanged(user => user ? setCurrentUser(user.email) : '')
        }
        const verbRef = firebase.database().ref('Verbs')
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
            setAllVerbs(complete)
            setDb(complete.filter(item => item.relatedUser === currentUser))
            const temp = complete.filter(item => item.relatedUser === currentUser).sort(() => Math.random() - 0.5).map((verb, index) => {
                if (index < 5) return verb
            })
            temp.length = 5
            setFiveForTest(temp)
        })
    }, [currentUser])
    return (
        currentUser || db ? <div className='containerMain'>
            <div className='containerContent'>
                {!mode && !currentUser ? <div className='footerImage'/> : !mode && currentUser ? <div className='footerImage2'/> : ''}
                {mode ? <Navigation mode={mode} currentUser={currentUser} setCurrentUser={setCurrentUser} setMode={setMode}/> : ''}
            <Main setFiveForTest={setFiveForTest} addVerb={addVerb} allVerbs={allVerbs} currentUser={currentUser} setCurrentUser={setCurrentUser} setMode={setMode} mode={mode} db={db} deleteVerb={deleteVerb} fiveForTest={fiveForTest}/>
                </div>
        </div> : 'loading'
    );
}

export default App;