import React from 'react';
import {FiDelete} from "react-icons/fi"


const VerbLine = ({verb, index, deleteVerb}) => {
    return (
        <tr className={`tableRow ${index % 2 ? "rowOne" : "rowTwo"}`}><td className='tableFirst'>{verb.verb}</td><td data-toggle="tooltip" title={verb.transcriptionInfinitive} className='tableSecond'>{verb.infinitive}</td><td data-toggle="tooltip" title={verb.transcriptionFirstForm} className='tableThird'>{verb.firstForm}</td><td className='tableFouth'><FiDelete className='forPointer' data-toggle="tooltip" title='Delete the verb' onClick={() => deleteVerb(verb.id)}/></td></tr>
    );
};

export default VerbLine;