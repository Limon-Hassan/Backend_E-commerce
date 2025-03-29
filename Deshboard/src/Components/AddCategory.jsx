import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
const AddCategory = () => {
  const [CategoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  // const [Image, setImageupload] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();

    const form = e.target.form;
    if (!form.checkValidity()) {
      form.reportValidity();
    } else {
      console.log("Product added!");
    }
  };
  return (
    <>
      <Card className="mx-auto w-full max-w-5xl p-6 shadow-lg">
        <Typography variant="h4" className="mb-4">
          Add Category
        </Typography>
        <form noValidate>
          <div className="flex flex-col gap-4">
            <div>
              <Typography variant="small" className="mb-3">
                Category Name *
              </Typography>
              <Input
                color="blue"
                type="text"
                label="Enter Category name"
                value={CategoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                maxLength={50}
              />
            </div>
            <div className="w-full">
              <Typography variant="small" className="mb-3">
                Description *
              </Typography>
              <Textarea
                color="blue"
                type="text"
                label="Description"
                className="h-[200px] w-full resize-none rounded border border-gray-300 bg-[#F5F5F5] p-4 text-[16px] font-normal text-black/50 outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                maxLength={500}
              />
            </div>
          </div>
          <div className="mt-6">
            <Typography variant="small" className="mb-3">
              Upload Images
            </Typography>

            <div class="flex w-full items-center justify-center">
              <label
                for="dropzone-file"
                class="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
              >
                <div class="flex flex-col items-center justify-center pb-6 pt-5">
                  <i class="fa-light fa-cloud-arrow-up mb-3 text-[30px] text-blue-600"></i>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <Button color="blue" onClick={handleAddCategory}>
              Add Category
            </Button>
            <Button color="gray">Save Category</Button>
            <Button color="gray" variant="outlined">
              Schedule
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddCategory;
