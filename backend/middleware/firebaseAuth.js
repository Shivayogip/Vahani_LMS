import admin from "../config/firebaseAdmin.js";

const verifyFirebaseToken = async (req,res,next) => {

  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({message:"No token"});
  }

  const token = authHeader.split(" ")[1];

  try{

    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = decodedToken;

    next();

  }catch(error){

    res.status(401).json({message:"Invalid token"});

  }
};

export default verifyFirebaseToken;