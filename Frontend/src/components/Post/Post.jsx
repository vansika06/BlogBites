import {
    Bird,
    Book,
    Bot,
    Code2,
    CornerDownLeft,
    LifeBuoy,
    Mic,
    Paperclip,
    Rabbit,
    Settings,
    Settings2,
    Share,
    SquareTerminal,
    SquareUser,
    Triangle,
    Turtle,
    Home,
    BookCheck,
    BookDashed
  } from "lucide-react"
  import React,{useState,useCallback,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate,useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { useLocation } from "react-router-dom"
  import { Badge } from "../ui/badge"
  import { Button } from "../ui/button"
  import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "../ui/drawer"
 // import { Input } from "../ui/input"
  import { Label } from "../ui/label"
   import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
   } from "../ui/select"
  import { Textarea } from "../ui/textarea"
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
  } from "../ui/tooltip"
  import Logo from "../Logo"
  import RTE from "../RTE"
  import SelectI from "../SelectI"
  import Input from "../Input"
   function Post() {
    const navigate=useNavigate()
    const [post,setPost]=useState(null);
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
    const location=useLocation()
    const { option } = location.state || { option: 'Normal' };
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm(
        {
            defaultValues:{
                title:post?.title||'',
                thumbnail:post?.thumbnail||'',
                description:post?.description||'',
                image:post?.image||'',
                status:post?.status||'active',
                media:post?.media||null,
           
            }
        }
    )
    useEffect(() => {
      if (post) {
        setValue('title', post.title);
        setValue('thumbnail', post.thumbnail);
        setValue('description', post.description);
        setValue('image', post.image);
        setValue('status', post.status);
        setValue('category', post.category);
        setValue('media',post.media)
      }
    }, [post, setValue]);
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
        if(post){
            data.image[0]?(formData.append('image', data.image[0])):null
            data.title?(formData.append('title',  data.title)):null
            data.thumbnail?(formData.append('thumbnail',  data.thumbnail)):null
            data.description?(formData.append('description',  data.description)):null
            data.status?( formData.append('status',data.status)
          ):null
          data.category?(formData.append('category',data.category)):null
          data.media?(formData.append('media',data.media[0])):null
          await  edit(formData)
        }
        else{
          
        formData.append('title', data.title);
        formData.append('thumbnail', data.thumbnail);
        formData.append('description', data.description);
       formData.append('category',data.category);
       formData.append('status',data.status);
       data.media?   formData.append('media',data.media[0]):null
        formData.append('image', data.image[0]);  
        }
        
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
    
      await  create(formData);
      };
        
    const renderMedia=()=>{
      if(option=="Audio" ||option=="Video" ){
        return(
          <div className="grid gap-3">
          <Input 
       label={`${option}:`}
       placeholder={`Enter the ${option} of your blog`}
       type="file"
        accept=".mp3,audio/*,video/* "
       {...register("media",{
           required:true
       })}
      
       />
          </div>
        )
      }
      return null
    }

    const handlePublish=()=>{
      setValue("status","active")
      handleSubmit(submit)();
      //navigate('/')
    }
    const handleDraft=()=>{
      setValue("status","inactive")
      handleSubmit(submit)();
     // navigate('/')
    }


    return (
      <div className="grid h-screen w-full pl-[56px] mx-5 my-5 bg-slate-300">
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
          
          <nav className="grid gap-1 p-2">
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="Addpost"
                >
                  <SquareTerminal className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Addpost
              </TooltipContent>
            </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Home"
                >
                  <Home className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Home
              </TooltipContent>
            </Tooltip>
            </TooltipProvider>
             <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="API"
                >
                  <Code2 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                API
              </TooltipContent>
            </Tooltip>
            </TooltipProvider>
            
          </nav>
          
        </aside>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-neutral-300 px-4">
            <h1 className="text-xl font-semibold">Add Your Blog</h1>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Settings className="size-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh]">
                <DrawerHeader>
                  <DrawerTitle>Post details</DrawerTitle>
                  <DrawerDescription>
                  Add details of your post.
                  </DrawerDescription>
                </DrawerHeader>
                <form encType="multipart/form-data" className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Details
                    </legend>
                    <div className="grid gap-3">
                    <SelectI
                    options={["Health","Technology","Science","Entertainment","General","Business","Education"]}
                    label="Category:"
                    className="mb-4"
                    {...register("category", { required: true })}
           />
                      
                    </div>
                    <div className="grid gap-3">
                    <Input 
                 label="Title:"
                 placeholder="Enter the title of your blog"
                 type="text"
                 {...register("title",{
                     required:true
                 })}
                
                 />
                    </div>
                    <div className="grid gap-3">
                    <Input 
                 label="Thumbnail:"
                 placeholder="Enter the thumbnail"
                 type="text"
                 {...register("thumbnail",{
                     required:true
                 })}
                
                 />
                 
                    </div>
                    <div className="grid gap-3">
                    <SelectI
                    options={["active","inactive"]}
                    label="Status:"
                    className="mb-4"
                    {...register("status", { required: true })}
           />
                    </div>
                  </fieldset>
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Featured Image
                    </legend>
                    <div className="grid gap-3">
                    <Input 
                 label="Image:"
                 placeholder="upload the featured image"
                 type="file"
                 accept="image/png,image/jpg,image/jpeg"
                 {...register("image",{
                     required:true
                 })}
                
                 />
                    </div>
                     {renderMedia()} 
                    
                  </fieldset>
                </form>
              </DrawerContent>
            </Drawer>
            <Button type="submit"
              variant="outline"
              size="md"
              className="ml-auto gap-0.5 text-md"
              onClick={handlePublish}
            >
              <BookCheck className="size-3.5" />
              Publish
            </Button>
            <Button type="submit"
              variant="outline"
              size="md"
              className="ml-auto gap-1.5 text-md"
              onClick={handleDraft}
            >
              <BookDashed className="size-3.5" />
              Draft
            </Button>
          </header>
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
            >
              <form encType="multipart/form-data" className="grid w-full items-start gap-6">
                <fieldset className="grid gap-6 rounded-lg border p-4 outline hover:outline-amber-700">
                <legend className="-ml-1 px-1 text-md font-medium">
                      Details
                    </legend>
                    <div className="grid gap-3">
                    <SelectI
                    options={["Health","Technology","Science","Entertainment","General","Business","Education"]}
                    label="Category:"
                    className="mb-4"
                    {...register("category", { required: true })}
           />
                      
                    </div>
                    <div className="grid gap-3">
                    <Input 
                 label="Title:"
                 placeholder="Enter the title of your blog"
                 type="text"
                 {...register("title",{
                     required:true
                 })}
                
                 />
                    </div>
                    <div className="grid gap-3">
                    <Input 
                 label="Thumbnail:"
                 placeholder="Enter the thumbnail"
                 type="text"
                 {...register("thumbnail",{
                     required:true
                 })}
                
                 />
                    </div>
                    <div className="grid gap-3">
                    <SelectI
                    options={["active","inactive"]}
                    label="Status:"
                    className="mb-4"
                    {...register("status", { required: true })}
           />
                    </div>
                  </fieldset>
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Featured Image
                    </legend>
                    <div className="grid gap-3">
                    <Input 
                 label="Image:"
                 placeholder="upload the featured image"
                 type="file"
                 accept="image/png,image/jpg,image/jpeg"
                 {...register("image",{
                     required:true
                 })}
                
                 />
                    </div>
                   {renderMedia()} 
                    
                </fieldset>
              </form>
            </div>
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
              
              
              <form
                className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
              >
                <Label htmlFor="message" className="sr-only">
                  Content
                </Label>
                
                <div className="flex items-center p-3 pt-0">
                <RTE label="Content:" name="description" control={control} defaultValue={getValues("description")}/>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    )
  }
 export default Post
 
 