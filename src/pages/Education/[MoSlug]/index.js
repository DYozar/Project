import { GetContentBasedOnModules, GetModulePosts } from '@/GraphQL/EducativeQueries/eduData'
import Card from '@/component/Postcard/card';
import Error from 'next/error';
import Link from 'next/link';
import React from 'react';

const ESlug = ({posts} ) => {
  if (!posts || posts.length === 0) {
    // No posts found, you can render a "No Posts Found" message here
    return <h1>No Posts Found</h1>;
  }
  return (
    <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 space-y-5' >
      <h2 className='text-[32px]'> {posts[0].module.Title}</h2>
      <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
        {posts.map((post ,index) => (
          <div key={index} className=''>
            <Card post={post}/>
          </div>
        ))}
      </div>
      
    </div>

  );
};

export default ESlug;


export async function getStaticProps({ params }){
  const maxLength = 1000
  const MoSlug = params.MoSlug
  const posts = await GetContentBasedOnModules(MoSlug); // You can provide a default pageSize here


  return {
  props: { posts , maxLength},
  
  };

}

export async function getStaticPaths(){
  const EducationPosts = await GetModulePosts()
  const paths = EducationPosts
  .filter((posts) => posts.MoSlug) // Filter out null MoSlug values
  .map((posts) => ({
      params: { MoSlug: posts.MoSlug },
  }));

  return {
      paths,
      fallback: false,
  };
}