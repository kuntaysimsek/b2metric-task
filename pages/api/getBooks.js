import db from "../../utils/db";

const handler = async (req, res) => {
  try {
    const books = await db.collection("library").get();
    const booksData = books.docs.map((book) => book.data());
    res.status(200).json(booksData);
  } catch (e) {
    console.log(e.message);
    res.status(400).end();
  }
};

export default handler;
