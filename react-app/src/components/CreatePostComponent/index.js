import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import 'react-quill/dist/quill.snow.css';
import './index.css'
import { createPost } from '../../store/feed';
import 'react-quill/dist/quill.bubble.css';

function CreatePostComponent(){
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);



    const handleChange = (value) => {
        setContent(value);
    };

    const handleSubmit = () => {
       const user_id = sessionUser.user_id;
       dispatch(createPost(user_id, content))
       setContent('')
    }

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{ 'font': ['serif', 'monospace'] }],
            ['color'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <div className="create-post">
           <ReactQuill className="quill" value={content} onChange={handleChange} modules={modules} theme="snow" />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default CreatePostComponent;
