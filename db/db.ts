import 'react-native-url-polyfill/auto';
import { decode } from 'base64-arraybuffer'
import { LostItem, AppUser } from "../types";
import { createClient } from '@supabase/supabase-js'
import AsyncStorageLib from "@react-native-async-storage/async-storage";

const supabaseUrl = 'https://aqrptclvzoonmvkqmkhj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDI0MzA2MSwiZXhwIjoxOTU1ODE5MDYxfQ.sLPV1Vh7ITqsHxuauMUZnR9p7JyYlZbgGFjtqVsbO5c'
export const supabase = createClient(supabaseUrl, supabaseKey, { localStorage: AsyncStorageLib, detectSessionInUrl: false, })

export async function signUpUser(newUser: AppUser) {
  console.log("supabase signUp");
  const { user, error } = await supabase.auth.signUp(
    {
      email: newUser.email,
      password: newUser.password,
    },
    {
      data: {
        id: newUser.id,
        fullname: newUser.fullName,
        phoneNumber: newUser.phoneNumber,
      }
    }
  )

  if (user) {
    console.log('supabse user')
    console.log(user)
    return user;
  } else {
    console.log('error')
    console.log(error)
    return false;
  }

}

export async function signInUser(email: string, password: string) {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  })

  if (user) {
    console.log('supabse user')
    return user;
  } else {
    console.log('error')
    console.log(error)
    return false;
  }
}

export async function updateUserInfo(newDetails: any) {
  const { user, error } = await supabase.auth.update({
    email: newDetails.email,
    password: newDetails.password,
    data: {
      id: newDetails.id,
      fullname: newDetails.fullName,
      phoneNumber: newDetails.phoneNumber,
    }
  })
  if (user) {
    console.log('supabse user')
    console.log(user)
    return user;
  } else {
    console.log('error')
    console.log(error)
    return false;
  }

}

export async function getAllLostItems() {
  let { data, error } = await supabase
    .from('Lost')
    .select('*')
    .eq('isClaimed', false)
    .eq('isDeleted', false)
    .order('datePosted', { ascending: true })
  if (!error) {
    return data;
  } else {
    console.log(error);
    return false
  }
}

export async function getAllClaimedItems() {
  let { data, error } = await supabase
    .from('Lost')
    .select('*')
    .eq('isClaimed', true)
    .eq('isDeleted', false)
    .order('claimDate', { ascending: true })
  if (!error) {
    console.log(data);
    return data;
  } else {
    console.log(error);
    return false
  }
}

export async function postLostItem(item: LostItem, base64Image: string) {
  const imageFileName = Date.now() + '.jpg'
  const { data: uploadResponse, error: uploadError } = await supabase.storage
    .from('dfoundbucket')
    .upload(`lost/${imageFileName}`, decode(base64Image as string), { contentType: 'image/jpg' })

  if (uploadError) {
    console.log('imageUploadError')
    console.log(uploadError)
    return { error: uploadError };
  }
  const { publicURL, error: urlError } = supabase
    .storage
    .from('dfoundbucket')
    .getPublicUrl(`lost/${imageFileName}`)
  if (urlError) {
    console.log(urlError)
    return { error: urlError }
  }
  item.onlineImage = publicURL as string

  try {
    const { data: postedItem, error: postError } = await supabase
      .from('Lost')
      .insert([item])
    if (!postError) {
      console.log("Posted item")
      console.log(postedItem)
      return { error: postError };
    } else {
      console.log("post error")
      console.log(postError);
      return { item: postedItem };
    }
  } catch (error) {
    console.log("errrrroor")
    console.log(error)
  }
}

export async function editItem(item: LostItem, base64Image: string) {
  if (base64Image) {
    const imageFileName = Date.now() + '.jpg'
    const { data: uploadResponse, error: uploadError } = await supabase.storage
      .from('dfoundbucket')
      .upload(`lost/${imageFileName}`, decode(base64Image as string), { contentType: 'image/jpg' })

    if (uploadError) {
      console.log('imageUploadError')
      console.log(uploadError)
      return { error: uploadError };
    }
    const { publicURL, error: urlError } = supabase
      .storage
      .from('dfoundbucket')
      .getPublicUrl(`lost/${imageFileName}`)
    if (urlError) {
      console.log(urlError)
      return { error: urlError }
    }
    item.onlineImage = publicURL as string
  }
  console.log(item)
  try {
    const { data: editedItem, error: editError } = await supabase
      .from('Lost')
      .update(item)
      .eq('id', item.id)
    if (!editError) {
      console.log("Updated item")
      console.log(editedItem)
      return { error: editError };
    } else {
      console.log("post error")
      console.log(editError);
      return { item: editedItem };
    }
  } catch (error) {
    console.log("errrrroor")
    console.log(error)
  }
}

export async function toggleItemIsReturned(itemID: String, state: Boolean) {
  let claimDate: String | null = null;
  if (state) {
    claimDate = (new Date()).toISOString()
  }
  console.log(state, itemID, claimDate);
  let { data, error } = await supabase.from('Lost').update([{ isClaimed: state, claimDate }]).eq('id', itemID)
  if (!error) {
    console.log(data);
    return { data };
  } else {
    console.log(error);
    return { error }
  }
}

export async function deleteLostItem(itemID: string) {
  let { data, error } = await supabase.from('Lost').update({ isDeleted: true }).eq('id', itemID)
  if (!error) {
    console.log(data);
    return { data };
  } else {
    console.log(error);
    return { error }
  }

}

export async function getUserPostedItems(userID: string) {
  let { data, error } = await supabase
    .from('Lost')
    .select('*')
    .eq('finderID', userID)
    .eq('isDeleted', false)
    .order('datePosted', { ascending: true })
  if (!error) {
    console.log(data);
    return data;
  } else {
    console.log(error);
    return false
  }
}
// export async getPhoneNumber(userID: string){

// }
