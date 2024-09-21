async function getProfile(req:any, res: any ) {
  let user=req.user;
  if (user) {
    return res.send(
      `<span>Email: ${user.email}</span></br></br><span>id: ${user.sessionId}</span></br><a href='/v1/login'>Logout</a>`
    );
  }
}

export{
  getProfile,
};
