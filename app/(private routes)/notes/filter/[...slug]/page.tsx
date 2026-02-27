
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

import type { Metadata } from "next";


interface NotesByCategoryProps {
  params:  Promise<{ slug: string[] }> ;
}

export const generateMetadata = async ({params}:NotesByCategoryProps): Promise <Metadata> =>{
  const {slug} = await params;
  const slugParam = slug?.[0] ?? "all";
  const tag = slugParam === "all" ? undefined : (slugParam as NoteTag);

  
  return {
    title: `Notes filter: ${tag}`,
    description: `Notes page filtered by ${tag} category`,
 openGraph: {
      title: `Notes filter: ${tag}`,
      description: `Notes page filtered by ${tag} category`,
       url: `https://08-zustand-phi-one.vercel.app/notes/filter/${tag}`, 
      images: [{ url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"}]
}
}
}

async function NotesByCategory({params}: NotesByCategoryProps) {
const {slug} = await params;
  const slugParam = slug?.[0] ?? "all";
  const tag = slugParam === "all" ? undefined : (slugParam as NoteTag);

    
 const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag}/>
          </HydrationBoundary>
  );


}

export default NotesByCategory;