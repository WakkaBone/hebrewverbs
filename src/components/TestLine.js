import React, {useEffect, useState} from 'react';

const TestLine = ({verb, newMistake, fiveRandomVerbs, fiveForTest}) => {
    const [infinitiveTest, setInfinitiveTest] = useState('')
    const [firstFormTest, setFirstFormTest] = useState('')
    const [message, setMessage] = useState('')
    const [verbState, setVerbState] = useState(verb)

    useEffect(() => {
        setFirstFormTest('')
        setInfinitiveTest('')
        setMessage('')
    }, [fiveForTest])

    useEffect(() => {setVerbState(verb)}, [verb])

    return (
        <div className='mobileOneLineTest'>
            <input value={verbState.verb}/>
            <input value={infinitiveTest} onChange={(e) => {
                setMessage('')
                setInfinitiveTest(e.target.value)
            }} placeholder='Infinitive'/>
            <input value={firstFormTest} onChange={(e) => {
                setMessage('')
                setFirstFormTest(e.target.value)
            }} placeholder='First Form'/>
            <button className='buttonCheck hebrewFont' onClick={() => {
                if(infinitiveTest === verbState.infinitive && firstFormTest === verbState.firstForm) {
                    setInfinitiveTest(`${verbState.infinitive} ${verbState.transcriptionInfinitive} `)
                    setFirstFormTest(`${verbState.firstForm} ${verbState.transcriptionFirstForm}`)
                    setMessage('Correct!')
                }
                else {
                    setInfinitiveTest(`${verbState.infinitive} ${verbState.transcriptionInfinitive} `)
                    setFirstFormTest(`${verbState.firstForm} ${verbState.transcriptionFirstForm}`)
                    newMistake(verbState)
                    setMessage('Wrong!')
                }
            }}>check</button>
            {message === 'Wrong!' ? <span className='message'>{message}</span> : <span className='messageCorrect'>{message}</span>}
        </div>
    );
};

export default TestLine;