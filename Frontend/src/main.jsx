import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Postform from './components/Post/Postform.jsx'
import Post from './components/Post/Post.jsx'
import Allpost from './components/Allpost.jsx'
import CatPosts from './components/CatPosts.jsx'
import Home from './components/Home.jsx'
import Particular from './components/Particular.jsx'
import ChatPage from './components/ChatPage.jsx'
import { SocketContextProvider } from './context/socketcontext.jsx'
import Verification from './components/Verification.jsx'
import Landing from './components/Landing.jsx'
import Test from './components/Test.jsx'
import Postlayout from './components/Postlayout.jsx'
import Messagecontainer from './components/Chattest.jsx'
//import { Header } from './components/index.js'

const router=createBrowserRouter([{
  path:'/',
  element:<App/>,
  children:[
    {
      path:'/',
      element:<Landing/>
    },
    {
      path:'/login',
      element:<Login/>
        //<Protected authentication={false}>
         // <Login/>
        //</Protected>
      
    },
    {
      path:'/signup',
      element:(
        //<Protected authentication={false}>
          <Signup/>
        //</Protected>
      )
    },
    {
      path: "/addPost",
      element: (
          // <Protected authentication>
          //     {" "}
          <Post/>
        //  </Protected>
      ),},
      {
        path: "/editPost/:blogId",
        element: (
            // <Protected authentication>
            //     {" "}
            <Post/>
          //  </Protected>
        ),},
        {
          path:"/Posts",
          element:(
          //  <Protected authentication>
             // {" "}
              <CatPosts/>
           // </Protected>
          ),
        },
        {
          path:"/main",
          element:(
          //  <Protected authentication>
             // {" "}
              <Postlayout/>
           // </Protected>
          ),
        },
        {
          path: "/viewPosts/:blogId",
          element: (
              // <Protected authentication>
              //     {" "}
              <Particular/>
            //  </Protected>
          ),},
          ,
          {
            path: "/chat",
            element: (
                // <Protected authentication>
                //     {" "}
                <ChatPage/>
              //  </Protected>
            ),},
            {
              path: "/verify",
              element: (
                  // <Protected authentication>
                  //     {" "}
                  <Verification/>
                //  </Protected>
              ),},
    ]}])/*
    {
      path:"/all-posts",
      element:(
        <Protected authentication>
          {" "}
          <Allpost/>
        </Protected>
      )
    },
    {
      path: "/addPost",
      element: (
          //<Protected authentication>
              //{" "}
              <Addpost />
          //</Protected>
      ),}{
      path: "/add-post",
      element: (
          <Protected authentication>
              {" "}
              <Addpost />
          </Protected>
      ),}
  ,
  
     { path: "/edit-post/:slug",
      element: (
          <Protected authentication>
              {" "}
              <Editpost />
          </Protected>
      ),
  },
  {
      path: "/post/:slug",
      element: <Post />,
  },



  ],
},])*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <SocketContextProvider> 
      
   <RouterProvider router={router}/>
    </SocketContextProvider> 
  </Provider>
)
