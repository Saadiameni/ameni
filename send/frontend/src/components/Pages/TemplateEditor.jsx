import React, { lazy, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import TemplateEditor3 from './TemplateEditors3';
import TemplateEditor1 from './TemplateEditors1';
import TemplateEditor2 from './TemplateEditors2';
import { useNavigate } from 'react-router-dom';

const EmailTemplate1 = lazy(() => import('./EmailTemplate1'));
const EmailTemplate2 = lazy(() => import('./EmailTemplate2'));
const EmailTemplate3 = lazy(() => import('./EmailTemplate3'));
function MainTemplateEditor() {
    const  {state }  = useLocation()
    console.log(state?.data)
    const { id } = useParams()
    const templates = [
        { id: 1, name: 'Template 1', Component: EmailTemplate1, Editor: TemplateEditor1 },
        { id: 2, name: 'Template 2', Component: EmailTemplate2, Editor: TemplateEditor2 },
        { id: 3, name: 'Template 3', Component: EmailTemplate3, Editor: TemplateEditor3 },
    ];
    
    const SelectedEditor = templates.filter(item => item.id == id)[0].Editor;

    return (
        <div>
            <SelectedEditor TemplateComponent={templates.filter(item => item.id == id)[0].Component} data={state?.data}/>
        </div>
    )
}

export default MainTemplateEditor