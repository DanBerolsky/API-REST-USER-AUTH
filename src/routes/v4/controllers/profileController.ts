import { Request, Response } from "express";


async function getProfile(req:Request, res:Response) {
  console.log(req.user);
  const cadena = JSON.stringify(req.user);
  return res.send(
    `</br><span>profile</span><br><span>${cadena}</span><br><a href='/v4/login'>Logout</a>`
  );
}

export {
  getProfile,
};
