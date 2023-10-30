import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import './index.css'
import { createComment, getFeed } from '../../store/feed';

function CreateCommentComponent({post_id}) {
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    let Quill = ReactQuill.Quill;
    let Font = Quill.import('formats/font');
    Font.whitelist = ['Arial', 'Times-New-Roman', 'Verdana', 'Courier-New', 'Georgia', 'Impact', 'Charcoal', 'Lucida-Sans-Unicode']; // Add the fonts you want here
    Quill.register(Font, true);

    const handleChange = (value) => {
        setContent(value);
    };

    const handleSubmit = () => {
       dispatch(createComment(post_id, content))
       dispatch(getFeed())
       setContent('')
    }



    return (
        <div className="create-comment">
           <ReactQuill className="quill" value={content} onChange={handleChange} theme="snow" />
            <button disabled={!content} onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default CreateCommentComponent;
