import { supabase } from "./clients"

export async function removeImage(path : string){
  await supabase.storage.from('Home').remove([path.replace("|", "_")])
}

export async function uploadImage(file : Buffer, cntType : string, path : string, bucket : string = "Home" ) : Promise<string>{
  await supabase.storage.from(bucket).upload(path.replace("|", "_"), file, {
    cacheControl: '3600',
    contentType : cntType,
    upsert: false
  })

  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl

}