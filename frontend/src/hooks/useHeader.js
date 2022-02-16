import useToken from "./useToken"
function useHeader() {
    const {token} = useToken();
    return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
    }
}

export default useHeader;



