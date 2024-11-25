import React, { useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Data} from '../../context/AppProvider'

export default function Editor() {
  const a = useContext(Data)
    let modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean'],
          [{ 'align': [] }]
        ],
      }
    
    let formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image','align'
      ]

    return <ReactQuill theme="snow" value={a.canvasvalue} onChange={a.setcanvasvalue} modules={modules}
    formats={formats} />;
}
