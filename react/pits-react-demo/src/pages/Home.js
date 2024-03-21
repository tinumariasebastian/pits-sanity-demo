import React from "react";
import { useEffect, useState } from "react";
import createClient from "../Client";
import { SanityClient } from "@sanity/client";
import Accordion from "../components/Accordion";


export default function Home(){
    const[postData, setPost] = useState(null);

    useEffect(() => {
        createClient.fetch(`*[_type == 'post']{
            title,
            _id
        }`).then((data) => setPost(data))
        .catch(console.error);
    },[])

    const handleChange = (e, index) =>{
        const updatePost = [...postData];
        updatePost[index].title = e.target.value;
        setPost(updatePost);
    }
    const handleSendToSanity = async (id, updatedTitle) => {
        try {
            // Send data to Sanity
            await createClient
            .patch(id)
            .set({ title: updatedTitle })
            .commit();
          console.log('Data sent to Sanity successfully');
          // Optionally, reset form fields or show success message
        } catch (error) {
          console.error('Error sending data to Sanity:', error.message);
        }
      };

    return (
        <>
        {Array.isArray(postData) && postData.map((post, index) => (
            <div key={index}>
                <h1>{post.title}</h1>
                <input type="text" value={post.title} onChange={(e) =>handleChange(e, index)}></input>
                <button onClick={(e)=>handleSendToSanity(post._id, post.title)}>Send to Sanity</button>
            </div>
        ) )}
           
          <Accordion></Accordion>  
         
        </>
        
    );
}