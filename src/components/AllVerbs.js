import React, {useState} from 'react';
import VerbLine from "./VerbLine";
import VerbLineAdd from "./VerbLineAdd";
import VerbLineAdmin from "./VerbLineAdmin";

const AllVerbs = ({db, deleteVerb, allVerbs, addVerb, currentUser}) => {
    const [viewAll, setViewAll] = useState(false)
    const [searchResult, setSearchResult] = useState('')
    const uniqueVerbs = []
    const uniqueVerbsLength = []
    return (
        <div className='commonMistakesMobile'>
            <div className='spaceInBetween'>
                <h1 className='hebrewFont newVerbsFirstRow'>{viewAll ? allVerbs.filter(item => {
                    if(!uniqueVerbsLength.includes(item.infinitive)) {
                        uniqueVerbsLength.push(item.infinitive)
                        return item
                    }
                }).length : db.length} verbs added:</h1>
                {viewAll ? <h3 style={{textDecoration: 'underline'}} className='buttonCheck hebrewFont forPointer' onClick={() => {
                setSearchResult([])
                setViewAll(false)
                }}><span className='switchToMobile'>Switch to</span> My verbs</h3> : <h3 style={{textDecoration: 'underline'}} className='buttonCheck hebrewFont forPointer' onClick={() => {
                    setSearchResult(allVerbs)
                    setViewAll(true)
                }}><span className='switchToMobile'>Switch to</span> All verbs</h3>}
                <div><input className='mobileSearch' onChange={(e) => {
                    const words = []
                    if(!viewAll){
                        db.map(item => item.verb.split('').filter(item => item !== ',').join('')).forEach(item => {if(!words.includes(item)) words.push(item)})
                        const res = words.filter(title => title.split(' ').findIndex(item => item.length > 2 && item.toLowerCase() === e.target.value.toLowerCase()) !== -1)
                        const temp = db.filter(item => res.includes(item.verb.split('').filter(item => item !== ',').join('')))
                        setSearchResult(temp)
                    } else {
                        allVerbs.map(item => item.verb.split('').filter(item => item !== ',').join('')).forEach(item => {if(!words.includes(item)) words.push(item)})
                        const res = words.filter(title => title.split(' ').findIndex(item => item.length > 2 && item.toLowerCase() === e.target.value.toLowerCase()) !== -1)
                        const temp = allVerbs.filter(item => res.includes(item.verb.split('').filter(item => item !== ',').join('')))
                        setSearchResult(temp)
                    }
                }} placeholder='search'/></div></div>

            {!viewAll ?
                <table className='tableRow'>
                    <tr>
                        <td className='tableBackground'>Translation</td>
                        <td className='tableBackground'>Infinitive</td>
                        <td className='tableBackground'>Pres. sing. male</td>
                        <td className='tableBackground'>Delete</td>
                    </tr>
                    {searchResult.length ? searchResult.map((verb, index) =>
                        <VerbLine key={index} index={index} verb={verb}
                                  deleteVerb={deleteVerb}/>) : db.length ? db.sort((a, b) => a.verb > b.verb ? 1 : -1).map((verb, index) =>
                            <VerbLine key={index} index={index} verb={verb} deleteVerb={deleteVerb}/>) :
                        <h4>No verbs here yet</h4>}</table>
                :
                viewAll && currentUser === 'alexwakka@yandex.ru' ?
                    <table className='tableRow'>
                        <tr>
                            <td className='tableBackground'>Translation</td>
                            <td className='tableBackground'>Infinitive</td>
                            <td className='tableBackground'>Pres. sing. male</td>
                            <td className='tableBackground'>Delete</td>
                            <td className='tableBackground'>Add</td>
                        </tr>
                        {searchResult.length ? searchResult.filter(item => {
                            if(!uniqueVerbs.includes(item.infinitive)) {
                                uniqueVerbs.push(item.infinitive)
                                return item
                            }}).sort((a, b) => a.verb > b.verb ? 1 : -1).map((verb, index) =>
                            <VerbLineAdmin db={db} allVerbs={allVerbs} setSearchResult={setSearchResult} addVerb={addVerb} key={index} index={index} verb={verb}
                                         deleteVerb={deleteVerb}/>) : db.length ? db.sort((a, b) => a.verb > b.verb ? 1 : -1).map((verb, index) =>
                                <VerbLineAdmin db={db} allVerbs={allVerbs} setSearchResult={setSearchResult} addVerb={addVerb} key={index} index={index} verb={verb} deleteVerb={deleteVerb}/>) :
                            <h4>No verbs here yet</h4>}</table>
                    :

                <table className='tableRow'>
                    <tr>
                        <td className='tableBackground'>Translation</td>
                        <td className='tableBackground'>Infinitive</td>
                        <td className='tableBackground'>Pres. sing. male</td>
                        <td className='tableBackground'>Add</td>
                    </tr>
                    {searchResult.length ? searchResult.filter(item => {
                        if(!uniqueVerbs.includes(item.infinitive)) {
                            uniqueVerbs.push(item.infinitive)
                            return item
                        }
                    }).sort((a, b) => a.verb > b.verb ? 1 : -1).map((verb, index) =>
                        <VerbLineAdd db={db} addVerb={addVerb} key={index} index={index} verb={verb}
                                  deleteVerb={deleteVerb}/>) : db.length ? db.sort((a, b) => a.verb > b.verb ? 1 : -1).map((verb, index) =>
                            <VerbLineAdd db={db} addVerb={addVerb} key={index} index={index} verb={verb} deleteVerb={deleteVerb}/>) :
                        <h4>No verbs here yet</h4>}</table>
            }
            </div>
    );
};

export default AllVerbs;