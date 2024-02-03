import { GraphQLFormattedError } from 'graphql';



type Error = {
  message: string;
  statusCode: string;
}

const customFetch = async (url: string, options: RequestInit) => {
  const accessToken = localStorage.getItem('Access_Token')
  const headers = options.headers  as Record<string, string>;
  
  return await fetch(url, {
    ...options,
    headers: {
      ...headers, 
      Authorization: headers.Authorization || `Bearer ${accessToken}`,
      "Content-type": "application/json",
      "Apollo-Require-Preflight": "true",
    }
  })
}

const getGraphQlErrors = (body: Record<"errors", GraphQLFormattedError[] | undefined>) :
  Error | null => {
    if(!body){
      return {
        message: "Unknown error",
        statusCode: "INTERNAL_SERVER_ERROR"
      }
    }
  
  if("errors" in body ){
    const errors = body?.errors;
    const messages = errors?.map(error => error?.message)?.join()
    const code = errors?.[0]?.extensions?.code
    return {
      message: messages || JSON.stringify(errors),
      statusCode: code || 500,
    }
  }
  return null;
}
export const fetchWrapper = async (URL: string, options: RequestInit) => {

  const response = await customFetch(URL, options)
    const responseClone = await response.clone()
    const body = await responseClone.json()
    const error = getGraphQlErrors(body)

    if(error){
      throw error;
    }
    return response 
}
