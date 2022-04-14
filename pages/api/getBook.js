import db from "../../utils/db";

const handler = async (req, res) => {
    try {
        const { bookName } = req.body;
        const { userId } = req.body;
        console.log(bookName, userId);

    const book = await db
      .collection("library")
      .where("bookName", "==", bookName)
      .get();

    book.forEach((doc) => {
      doc.ref.update({
        userId: userId
      });
      res.status(200).json();
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).end();
  }
};

export default handler;