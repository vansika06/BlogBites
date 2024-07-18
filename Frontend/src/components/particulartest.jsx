 /* <div>
      {blog && <>
        <div className=' flex container mx-auto'  >
     <div>
    <h2 class="text-4xl font-extrabold text-yellow-400 mt-5 mb-5">{blog.title}</h2>
    <figure class="max-w-screen-md">
    <blockquote>
        <p class="text-2xl font-semibold text-gray-900 dark:text-white">{blog.thumbnail}</p>
    </blockquote>
    {blog.ownerDetails && (
      <figcaption class="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
      <img class="w-6 h-6 rounded-full" src={blog.ownerDetails.avatar} alt="profile picture"/> 
     <div class="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
         <cite class="pe-3 font-medium text-gray-900 dark:text-white">{blog.ownerDetails.username}</cite>
         <cite class="ps-3 text-md text-amber-600 dark:text-gray-400">{blog.ownerDetails.fullname}</cite>
        <br/>
         {/* <button type="button" class="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 " onClick={handleclick}>{following?"Unfollow":"Follow"}</button> 
     </div>
 </figcaption>
    )}
     
    </figure> 
    </div>
    
    <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
      <img
        class="object-cover object-center w-full rounded-lg shadow-xl h-96 shadow-blue-gray-900/50"
        src={blog.image}
        alt="nature image"
      />
    </div>
    </div>
    <div className=' flex container mx-auto'  >
    {
      mediaType==="audio" && (
        <div>
          <audio controls src={blog.media} />
        </div>
      )
    }
    {
      mediaType==="video" && (
        <div>
        <video class="h-80 w-96" controls>
      <source src={blog.media} type="video/mp4"/>
      Your browser does not support the video tag.
    </video>
    </div>
      )
    }
    <p class="mb-3 text-gray-200 dark:text-gray-100 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-start">{blog.description}</p>

    </div></>}
    
    
    <aside id="default-sidebar" class="fixed top-10 right-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
    {/* {
     comments&& comments.map((comm,index)=>(
        <Comment key={index} content={comm.content} owner={comm.commentOwner} createdAt={comm.createdAt}/>
      )

      )
    } 
    </div>
    </aside>
    </div>
    */
   
