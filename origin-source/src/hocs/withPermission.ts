
const  WithPermission=(permissionsDisplay:any=[],permissionsUser:any=[])=> {

     return permissionsDisplay?.some((r:any)=>permissionsUser?.includes(r))
};


export default WithPermission


