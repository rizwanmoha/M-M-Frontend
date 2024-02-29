import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
 

  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/admin/create-category`,
        {
          name: categoryName,
        }
      );
      console.log(response.data);

      setCategoryName("");
      toast.info("Category Added ");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/admin/allcategories`
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/admin/deletecategories/${categoryId}`
      );

      setCategories(categories.filter((c) => c._id !== categoryId));
      toast.info("Category Deleted");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [categories]);

  return (
    <>
      <div className="flex justify-center mb-3">
        <h1 className="font-bold text-4xl text-white">List of Categories</h1>
      </div>

      <div>
        <div className="px-2">
          <h1 className="ml-48 text-2xl font-bold"> Add category</h1>
        </div>
        <div className="w-full px-3 mb-4 flex justify-start">
          <div className="flex">
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              className="w-full pl-10 pr-3 py-2 ml-48 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
        </div>
        <div className="px-5 mb-5">
          <button
            className="ml-48 bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"
            type="submit"
            onClick={handleAddCategory}
          >
            Add Category
          </button>
        </div>
      </div>

      <div className="w-75 mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="text-white">
                Name
              </th>
              <th scope="col" className="text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c._id} className="py-2">
                <td className="text-white">{c.name}</td>
                <td className="flex gap-5">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setVisible(true);
                      setUpdatedName(c.name);
                      setSelected(c);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleDelete(c._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Category;
