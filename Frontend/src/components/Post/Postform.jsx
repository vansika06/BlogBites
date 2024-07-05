import React,{useState,useCallback,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import Input from '../Input'
import Select from '../SelectI'
import RTE from '../RTE'
import { useNavigate,useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
 function Postform() {
    const navigate=useNavigate()
    const [Post,setPost]=useState(null);
    const [error,setError]=useState('')
    const {blogId}=useParams()
    useEffect(() => {
      if (blogId) {
        axios.post('http://localhost:4000/api/v1/blog/getPost', { blogId }, {
          withCredentials: true
        })
        .then(response => {
          setPost(response.data);
        })
        .catch(err => {
          setError('Blog not found correctly');
        });
      }
    }, [blogId]);
    
   
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm(
        {
            defaultValues:{
                title:Post?.title||'',
                thumbnail:Post?.thumbnail||'',
                description:Post?.description||'',
                image:Post?.image||'',
                status:Post?.status||'active',
           
            }
        }
    )
    useEffect(() => {
      if (Post) {
        setValue('title', Post.title);
        setValue('thumbnail', Post.thumbnail);
        setValue('description', Post.description);
        setValue('image', Post.image);
        setValue('status', Post.status);
        setValue('category', Post.category);
      }
    }, [Post, setValue]);
    const userData=useSelector(state=>state.auth.userData)
    const create=async(data)=>{
      try{
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };

       const res=await axios.post('http://localhost:4000/api/v1/blog/post',data,{
        withCredentials: true
        
    })
    if(res){
        navigate("/")  
    }}
    catch(e){
      setError(e.message)
    }
    
    }
    const edit=async(data)=>{
      try{
        const res=await axios.patch('http://localhost:4000/api/v1/blog/post',data,{
         withCredentials: true
         
     })
     if(res){
         navigate("/")  
     }}
     catch(e){
       setError(e.message)
     }
    }
    const submit=async(data)=>{
      setError('');
      const formData = new FormData();
        if(Post){
            data.image[0]?(formData.append('image', data.image[0])):null
            data.title?(formData.append('title',  data.title)):null
            data.thumbnail?(formData.append('thumbnail',  data.thumbnail)):null
            data.description?(formData.append('description',  data.description)):null
            data.status?( formData.append('status',data.status)
          ):null
          data.category?(formData.append('category',data.category)):null
          data.media?(formData.append('media',data.media)):null
            edit(formData)
        }
        else{
          
        formData.append('title', data.title);
        formData.append('thumbnail', data.thumbnail);
        formData.append('description', data.description);
       formData.append('category',data.category);
       formData.append('status',data.status);
       formData.append('media',data.media);
        formData.append('image', data.image[0]);  
        }
        
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
    
        create(formData);
      };
        
    

    const handlePublish=()=>{
     // setValue("status","active")
      handleSubmit(submit)();
      //navigate('/')
    }
    const handleDraft=()=>{
     // setValue("status","inactive")
      handleSubmit(submit)();
     // navigate('/')
    }


  return (
    <div>
    <div class="lg:flex lg:items-center lg:justify-between">
  <div class="min-w-0 flex-1">
    <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Add Your Blog Here...</h2>
    </div> 
    <div class="mt-5 flex lg:ml-4 lg:mt-0">
    <span class="sm:ml-3">
      <button type="submit" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleDraft}>
        <svg class="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
        </svg>
        Save as Draft
      </button>
    </span>
    <span class="sm:ml-3">
      <button type="submit" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handlePublish}>
        <svg class="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
        </svg>
        Publish
      </button>
    </span>
    </div>
    <form encType="multipart/form-data" className='flex flex-wrap'>
      <div className='w-2/3 px-2'>
           <Input 
                 label="Title:"
                 placeholder="Enter the title of your blog"
                 type="text"
                 {...register("title",{
                     required:true
                 })}
                
                 />

            <Input 
                 label="Thumbnail:"
                 placeholder="Enter the thumbnail"
                 type="text"
                 {...register("thumbnail",{
                     required:true
                 })}
                
                 />

            <RTE label="Content:" name="description" control={control} defaultValue={getValues("description")}/>
      </div>
      <div className='w-1/3 px-2'>
      <Input 
                 label="Image:"
                 placeholder="upload the featured image"
                 type="file"
                 accept="image/png,image/jpg,image/jpeg"
                 {...register("image",{
                     required:true
                 })}
                
                 />
          
          <Select
                    options={["Health","Technology","Science","Entertainment","General","Business","Education"]}
                    label="Category:"
                    className="mb-4"
                    {...register("category", { required: true })}
           />
           <Select
                    options={["active","inactive"]}
                    label="Status:"
                    className="mb-4"
                    {...register("status", { required: true })}
           />
           
      </div>
    </form>
    </div>
    </div>
  )
}
export default Postform