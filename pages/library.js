import { useEffect, useState } from "react";
import axios from "axios";
import UseInput from "../hooks/useInput";

function library() {
  const [editBookData, setEditBookData] = useState({
    bookName: "",
    author: "",
  });
  const [inputs, setInputs] = UseInput({
    book: "",
    author: "",
    editedbook: "",
    editedauthor: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/getBooks");
      setBooks(res.data);
    }

    fetchData();
  }, []);

  const removeBook = async (e) => {
    e.preventDefault();
    setShowDeleteModal(!showDeleteModal);
    await axios.post(`/api/removeBook`, {
      bookName: e.target.parentElement.querySelector("p").textContent,
    });
  };

  const openEditBook = async (e) => {
    setShowEditModal(!showEditModal);
    setEditBookData({
      bookName: e.target.parentElement.querySelector("#book-name").textContent,
      author: e.target.parentElement.querySelector("#author").textContent,
    });
  };

  const editBook = async (e) => {
    setShowEditModal(!showEditModal);
    await axios.post(`/api/editBook`, {
      bookName: editBookData.bookName,
      editedBookName: inputs.editedbook,
      editedAuthor: inputs.editedauthor,
    });
  };

  const addBook = async (e) => {
    e.preventDefault();
    await axios.post(`/api/addBook`, {
      bookName: inputs.book,
      author: inputs.author,
    });
    console.log(inputs.book);
    setShowAddBookModal(!showAddBookModal);
  };

  return (
    <div className="flex justify-center dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 lg:w-5/12 sm:w-8/12 w-full max-w-lg rounded-lg sm:p-8">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Latest Customers
          </h5>
          <button
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            onClick={() => setShowAddBookModal(!showAddBookModal)}
          >
            Add Book
          </button>
          {showAddBookModal ? (
            <div
              id="authentication-modal"
              className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
            >
              <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex justify-end p-2">
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      data-modal-toggle="authentication-modal"
                      onClick={() => setShowAddBookModal(!showAddBookModal)}
                    >
                      a
                    </button>
                  </div>
                  <form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                      Sign in to our platform
                    </h3>
                    <input
                      type="text"
                      name="book"
                      id="book"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="book name"
                      required
                      value={inputs.book}
                      onChange={setInputs}
                    />
                    <input
                      type="text"
                      name="author"
                      id="author"
                      placeholder="author"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      value={inputs.author}
                      onChange={setInputs}
                    />
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={addBook}
                    >
                      Add Book
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {books.map((book) => (
              <li key={book.bookName} className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p
                      id="book-name"
                      className="text-sm font-medium text-gray-900 truncate dark:text-white"
                    >
                      {book.bookName}
                    </p>
                    <p
                      id="author"
                      className="text-sm text-gray-500 truncate dark:text-gray-400"
                    >
                      {book.author}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    onClick={openEditBook}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    onClick={removeBook}
                  >
                    Delete
                  </button>
                  {showEditModal ? (
                    <div
                      id="authentication-modal"
                      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
                    >
                      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          <div className="flex justify-end p-2">
                            <button
                              type="button"
                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                              data-modal-toggle="authentication-modal"
                              onClick={() => setShowEditModal(!showEditModal)}
                            >
                              a
                            </button>
                          </div>
                          <form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                              Sign in to our platform
                            </h3>
                            <input
                              type="text"
                              name="editedbook"
                              id="editedbook"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              placeholder={editBookData.bookName}
                              required
                              value={inputs.editedbook}
                              onChange={setInputs}
                            />
                            <input
                              type="text"
                              name="editedauthor"
                              id="editedauthor"
                              placeholder={editBookData.author}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              required
                              value={inputs.editedauthor}
                              onChange={setInputs}
                            />
                            <button
                              type="submit"
                              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={editBook}
                            >
                              Login to your account
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default library;
