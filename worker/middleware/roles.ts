export function allow(...roles:string[]){

  return async(c,next)=>{

    const payload =
    c.get("jwtPayload");

    if(
      !payload ||
      !roles.includes(payload.role)
    ){
      return c.json({
        success:false,
        message:"FORBIDDEN"
      },403);
    }

    await next();

  };

}
