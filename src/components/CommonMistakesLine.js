import React, {useState} from 'react';

const CommonMistakesLine = props => {
    const [infinitiveTest, setInfinitiveTest] = useState('')
    const [firstFormTest, setFirstFormTest] = useState('')
    const [message, setMessage] = useState('')

    return (
        <div className='mobileOneLineTest'>
            <input value={props.verb.verb}/>
            <input value={infinitiveTest} onChange={(e) => {
                setMessage('')
                setInfinitiveTest(e.target.value)
            }} placeholder='Infinitive'/>
            <input value={firstFormTest} onChange={(e) => {
                setMessage('')
                setFirstFormTest(e.target.value)
            }} placeholder='First Form'/>
            <button className='buttonCheck hebrewFont' onClick={() => {
                if(infinitiveTest === props.verb.infinitive && firstFormTest === props.verb.firstForm) {
                    setInfinitiveTest(`${props.verb.infinitive} ${props.verb.transcriptionInfinitive} `)
                    setFirstFormTest(`${props.verb.firstForm} ${props.verb.transcriptionFirstForm}`)
                    setMessage('Correct!')
                }
                else {
                    setInfinitiveTest(`${props.verb.infinitive} ${props.verb.transcriptionInfinitive} `)
                    setFirstFormTest(`${props.verb.firstForm} ${props.verb.transcriptionFirstForm}`)
                    props.newMistake(props.verb)
                    setMessage('Wrong!')
                }
            }}>check</button>
            {message === 'Wrong!' ? <span className='message'>{message}</span> : <span className='messageCorrect'>{message}</span>}
        </div>
    );
};

export default CommonMistakesLine;