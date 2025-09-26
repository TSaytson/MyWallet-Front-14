export default function useConfigHeader(token){
  const headers = {
    authorization: `Bearer ${token}`
  }
  return {headers}
}
