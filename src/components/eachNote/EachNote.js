import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { Button, IconButton } from '@mui/material';
import './eachNote.css'
import { useParams } from 'react-router-dom';
import moment from 'moment';


const EachNote = ({allNotes,setAllNotes}) => {
    const params = useParams();
    console.log(params);
    console.log(params.id);
    console.log(allNotes);

    const [targetObject,setTargetObject]=useState(null)
    useEffect(()=>{
        if(allNotes&&allNotes.length>0&&params.id){
            let fileredArray=allNotes.filter(e=>{
                return e.id===params.id
            })
            if(fileredArray.length>0) setTargetObject(fileredArray[0]) 
                else window.location.href="/"
            }
        else window.location.href="/"
    },[allNotes,params])
    console.log(targetObject);


    const [editText,SetEditText] = useState(params.description)
    const[editTitle,setEditTitle]= useState(params.text)
    const[showTextArea,setShowTextArea]= useState(false)


    const handleEdit = ()=>{
        setAllNotes(e=>e.map(prev=>{
            return prev.id == params.id?
            {...prev,editText:editText,editTitle:editTitle}:{...prev}
        }))
        setShowTextArea(true)

    }
    const handleDelete = () => {
        const updatedNotes = allNotes.filter(e => {
            return e.id !== params.id;
        });
        window.location.href="/"
        setAllNotes(updatedNotes);
        localStorage.setItem("Notes", JSON.stringify(updatedNotes))
    };

    const handleSave = ()=>{
        setAllNotes(item=>item.map(e=>{
            return e.id===params.id?{...e,text:editTitle,description:editText,updatedAt:new Date().getTime()}:{...e}
        }))
        setShowTextArea(false)
    }
    const handleCancel = ()=>{
        setShowTextArea(false)
    }
    const showDate = ()=>{
        if(params.createdat === params.updatedAt){
            return params.createdat
        }else{
            return params.updatedAt
        }
    }

    return ( 
        <div>
            {targetObject?
            <div className = 'note description' style={{background:targetObject.color}}>
            <div className='note-title'>
            
                {showTextArea ? <div>
                    <div>
                        <textarea 
                        cols="53" 
                        rows="3"
                        placeholder='Edit a title...'
                        value={editTitle}
                        onChange={(e)=>setEditTitle(e.target.value)}
                        />
                    </div>
                    <div>
                    <textarea 
                        cols="53" 
                        rows="8"
                        placeholder='Edit a description...'
                        value={editText}
                        onChange={(e)=>SetEditText(e.target.value)}
                        />
                    </div>
                    <div className='btns'>
                        <Button onClick={handleSave}>Save</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </div>
                </div>:
            <div>
                <span style={{ fontWeight: "bold", textAlign: "center" }}>{targetObject.text}</span>
                <div style={{textAlign:"start"}}><p>{targetObject.description}</p></div>
                <div className='note-footer'style={{fontSize:"15px"}}>
                    <small>{moment(showDate()).format('MMMM Do YYYY, h:mm:ss a')}</small>
                    <div>
                        <IconButton onClick={handleEdit}>
                            <UpdateIcon/>
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                </div>
            </div>
        }
    </div>
</div>:
        <div className='error-page'>
            No page found !
        </div>}
        </div>
    )
}

export default EachNote














//setTargetObject(null) //window.location.href="/"
//setTargetObject(null) //window.location.href="/"