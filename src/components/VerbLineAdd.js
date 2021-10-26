import React, {useState} from 'react';
import {AiOutlinePlusCircle} from "react-icons/ai"

const VerbLineAdd = ({verb, index, addVerb, db}) => {
    const [added, setAdded] = useState(() => db.map(item => item.verb).includes(verb.verb))
    return (
        <tr className={`tableRow ${index % 2 ? "rowOne" : "rowTwo"}`}><td className='tableFirst'>{verb.verb}</td><td data-toggle="tooltip" title={verb.transcriptionInfinitive} className='tableSecond'>{verb.infinitive}</td><td data-toggle="tooltip" title={verb.transcriptionFirstForm} className='tableThird'>{verb.firstForm}</td><td className='tableFouth'>
            {added ? <AiOutlinePlusCircle data-toggle="tooltip" title='You already have this verb in your collection' className={`${added ? 'added' : ''}`}/> : <AiOutlinePlusCircle className={`forPointer ${added ? 'added' : ''}`} data-toggle="tooltip" title='Add to my verbs' onClick={() => {
            addVerb(verb.verb, verb.infinitive, verb.firstForm, verb.transcriptionInfinitive, verb.transcriptionFirstForm)
            setAdded(true)
        }}/>}</td></tr>
    );
};

export default VerbLineAdd;