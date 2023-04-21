import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE, process.env.SUPABASE_SECRET_KEY)

export async function removeImage(path : string){
  await supabase.storage.from('Home').remove([path])
}

export async function uploadImage(file : Buffer, cntType : string, path : string ) : Promise<string>{
  
  await supabase.storage.from('Home').upload(path, file, {
    cacheControl: '3600',
    contentType : cntType,
    upsert: false
  })

  return supabase.storage.from("Home").getPublicUrl(path).data.publicUrl

} 