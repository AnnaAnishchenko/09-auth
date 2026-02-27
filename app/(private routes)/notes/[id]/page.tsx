import {fetchNoteById} from "@/lib/api";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

import type { Metadata } from "next";




interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate metadata for the note page

export const generateMetadata = async ({params}:PageProps): Promise <Metadata> =>{
  const { id } = await params;
  const note  = await fetchNoteById(id);
  
  return {
    title: note.title,
    description: note.content,
 openGraph: {
      title: note.title,
      description: note.content,
       url: `https://08-zustand-phi-one.vercel.app/notes/${id}`, 
      images: [{ url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"}]
}
}
}


async function NoteDetails ({ params }: PageProps) {
	 const { id } = await params;
  
  const queryClient = new QueryClient();

await queryClient.prefetchQuery({
	queryKey: ["note", id],
	queryFn: () => fetchNoteById(id),
  });





	  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}


export default NoteDetails;