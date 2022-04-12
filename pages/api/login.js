import db from "../../utils/db";

const handler = async (req, res) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const users = await db.collection("authentication").get();

    const usersData = users.docs.map((user) => user.data());

    if (
      usersData.some((user) => user.email === email) &&
      usersData.some((user) => user.password === password)
    ) {
      console.log("login");
      res.status(200).json({message: "success"});
    } else {
      console.log("not login");
      res.status(401).json({error: "email yada pass uyusmadi"});
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).end();
  }
};

export default handler;