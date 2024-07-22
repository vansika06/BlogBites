import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
 function RTE({name,control,label,defaultValue=""}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}
            </label>}
      <Controller 
      name={name||"content"}
      control={control}
      render={
        ({field:{onChange}})=>(
            <Editor
            apiKey='87wkj0r9wgn29fexo4plaa255u4sazfjev74fyftaoun8lc3'
            initialValue={defaultValue}
            init={
                {initialValue: defaultValue,
                    height: 500,
                    file: { title: 'File', items: 'newdocument | preview ' },
                    edit: { title: 'Edit', items: ' cut copy paste pastetext | selectall | searchreplace' },
                   
                    
                    format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
                    tools: { title: 'Tools', items: 'wordcount' },
                   
                    plugins: [
                        
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        
                        "code",
                        
                        "wordcount",
                        "anchor",
                    ],
                    toolbar:
                 "bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                }}
                onEditorChange={onChange}
                />
   ) }
   />
         
    </div>
  )
}
export default RTE