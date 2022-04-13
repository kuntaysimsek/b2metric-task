import React, { useEffect, useState } from "react";
import axios from "axios";

function library() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/getBooks");
      console.log(res.data);
      setBooks(res.data);
      console.log(books);
    }

    fetchData();
  }, []);

  function removeBook() {
    setShowDeleteModal(!showDeleteModal);
  }

  function updateBook() {
    setShowUpdateModal(!showUpdateModal);
  }

  function addBook() {
    setShowAddBookModal(!showAddBookModal);
  }

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
                    />
                    <input
                      type="text"
                      name="author"
                      id="author"
                      placeholder="author"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
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
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Bonnie Green
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  onClick={() => setShowUpdateModal(!showUpdateModal)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  onClick={() => setShowDeleteModal(!showDeleteModal)}
                >
                  Delete
                </button>
                {showDeleteModal ? (
                  <div
                    id="popup-modal"
                    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center"
                  >
                    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex justify-end p-2">
                          <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            data-modal-toggle="popup-modal"
                            onClick={() => setShowDeleteModal(!showDeleteModal)}
                          >
                            a
                          </button>
                        </div>

                        <div className="p-6 pt-0 text-center">
                          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this book?
                          </h3>
                          <button
                            data-modal-toggle="popup-modal"
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                            onClick={removeBook}
                          >
                            Yes
                          </button>
                          <button
                            data-modal-toggle="popup-modal"
                            type="button"
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            onClick={() => setShowDeleteModal(!showDeleteModal)}
                          >
                            No, cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {showUpdateModal ? (
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
                            onClick={() => setShowUpdateModal(!showUpdateModal)}
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
                          />
                          <input
                            type="text"
                            name="author"
                            id="author"
                            placeholder="author"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                          />
                          <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={updateBook}
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
          </ul>
        </div>
      </div>
    </div>
  );
}

export default library;
