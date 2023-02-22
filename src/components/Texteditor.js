import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export default function Texteditor ({setEditorState, editorState}) {

    return(
        <>
        <div className='texteditor'>
        <Editor
        editorState={editorState}
        toolbarClassName="toolbar-class "
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        onEditorStateChange={setEditorState}
        toolbar={{
            options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'emoji', 'remove', 'history'],
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { },
        }}
      />
      </div>
      </>
    )
}