import React, { useEffect, useState } from 'react'
import SearchBar from './searchBar/SearchBar';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './note.css'
import moment from 'moment';
import { Link} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';


const NoteList = ({allNotes,setAllNotes,setSearchText}) => {

    const [titleInputValue,settitleInputValue]= useState("")
    const [desInputValue,setDesInputValue] = useState("")
    const [showTextArea,setShowTextArea]= useState(false)
    const [showAddButton,setAddButton] = useState(true)

    const saveClicked=()=>{
        let data={
            text:titleInputValue,
            description:desInputValue,
            id: uuidv4(),
            color:getRandomColor(),
            createdat: new Date().getTime(),
            updatedAt: new Date().getTime()
        }
        console.log(data);
        setAllNotes(e=>[...e,data])
        setShowTextArea(false)
        settitleInputValue("")
        setDesInputValue("")
        setAddButton(true)
    }
    console.log(allNotes);
    //console.log(createdDate.toLocaleDateString())
    useEffect(()=>{
        localStorage.setItem("Notes", JSON.stringify(allNotes))
    }, [allNotes])

    const cancelClicked = ()=>{
    settitleInputValue("")
    setDesInputValue("")
    setAddButton(true)
    setShowTextArea(false)
    }
    const addButtonClicked = ()=>{
    setShowTextArea(true)
    setAddButton(false)
    }

const getRandomColor =()=>{
    const colors = [
        'rgb(217,187,249)', 
        'rgb(215,247,242)' ,
        'rgb(214,249,239)' , 
        'rgb(247,215,216)'];
    const randomIndex = Math.floor(Math.random()*colors.length);
    return colors[randomIndex];

}
const iconStyle ={
    width: '48px',
    height: '48px',
    backgroundColor: 'red',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}
// const [searchText,setSearchText] = useState("");

    return (
        <div>
            <div>
                <div className='search-bar'>
                    <SearchIcon fontSize='2px'/>
                    <input onChange={(ev)=>setSearchText(ev.target.value)} 
                        type="text" 
                        placeholder='search notes'/>
                </div>
            </div>
            <div className='notes-list'>
            {allNotes?.map(e=>{
                return ( 
                    <EachNote e={e}
                        allNote = {allNotes}
                        setAllNote ={setAllNotes}/>
                )
            })}
            <div className=''  >
                    {showTextArea 
                    &&
                    <div>
                    <div className='note'style={{background:getRandomColor()}} >
                    <textarea 
                    cols={20}
                    rows={3}
                    placeholder='Title'
                    value={titleInputValue} 
                    onChange={(e)=>settitleInputValue(e.target.value)}/>
                    </div>
                    <div className='note'style={{background:getRandomColor()}} >
                    <textarea 
                    cols={32}
                    rows={8}
                    placeholder='description'
                    value={desInputValue} 
                    onChange={(e)=>setDesInputValue(e.target.value)}/>
                    </div>
                    </div>
                    }
                    <div className='note_save'>
                    {titleInputValue&& desInputValue &&
                    <div className='btns'>
                        <Button onClick={saveClicked}>Save</Button>
                        <Button onClick={cancelClicked}>Cancel</Button>
                    </div>
                    }
                    </div>
                    {showAddButton &&
                    <IconButton style={iconStyle} onClick={addButtonClicked}>
                        <AddIcon/>
                    </IconButton>}
            </div>
        </div>
    </div>
    )
}

export default NoteList
const EachNote = ({e,setAllNote,allNote})=>{
    const handleDelete = ()=>{
        const filter = allNote.filter(data=>{
            return data.id !== e.id}
                )
            setAllNote(filter)
        }
    return (
        <div>
            <div className='note' style={{backgroundColor:e.color}}>
                <div className='main-note-title'>
                <Link to={`EachNote/${e.id}`} >
                    {e.text}
                </Link>
                </div>
                <div className='note-footer'style={{fontSize:"12px"}}>
                    <span>{moment(e.createdat === e.updatedAt? e.createdat:e.updatedAt)
                    .format('MMMM Do YYYY, h:mm:ss a')}</span>
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}