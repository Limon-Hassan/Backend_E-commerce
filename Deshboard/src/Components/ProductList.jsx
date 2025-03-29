import { Input } from "@material-tailwind/react";
import React from "react";

const ProductList = () => {
  return (
    <>
      <section>
        <div className="mx-auto max-w-[1400px]">
          <div className="mt-8 w-full rounded-2xl bg-white p-4 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">All Product</h2>
              <div className="w-[450px]">
                <Input
                  color="blue"
                  label="Search..."
                  className="fant placeholder:font-Oi_kiree"
                />
              </div>
              <button className="rounded-lg border border-red-400 px-[42px] py-[12px] text-[20px] text-red-500 duration-300 ease-in-out hover:bg-red-500 hover:text-white">
                <span>+</span> Add product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2">Products</th>
                    <th className="px-4 py-2">Product ID</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Stock</th>
                    <th className="px-4 py-2">Sale</th>
                    <th className="px-4 py-2">Revenue</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="flex items-center gap-2 px-4 py-3">
                      <img
                        src="/mans.png"
                        alt="Product"
                        className="h-10 w-10 rounded-lg"
                      />
                      Soft Fluffy Cats
                    </td>
                    <td className="px-4 py-3">#327</td>
                    <td className="px-4 py-3">$11.70</td>
                    <td className="px-4 py-3">28</td>
                    <td className="px-4 py-3">On sale</td>
                    <td className="px-4 py-3">$328.85</td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-red-200 px-2 py-1 text-sm text-red-600">
                        Not Available
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <i class="fa-light fa-pen-line mr-[20px] cursor-pointer text-[24px] text-green-500"></i>
                      <i class="fa-light fa-trash cursor-pointer text-[24px] text-red-400"></i>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="flex items-center gap-2 px-4 py-3">
                      <img
                        src="/mans.png"
                        alt="Product"
                        className="h-10 w-10 rounded-lg"
                      />
                      Taste of the Wild Formula Finder
                    </td>
                    <td className="px-4 py-3">#380</td>
                    <td className="px-4 py-3">$8.99</td>
                    <td className="px-4 py-3">10</td>
                    <td className="px-4 py-3">On sale</td>
                    <td className="px-4 py-3">$105.55</td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-red-200 px-2 py-1 text-sm text-red-600">
                        Not Available
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <i class="fa-light fa-pen-line mr-[20px] cursor-pointer text-[24px] text-green-500"></i>
                      <i class="fa-light fa-trash cursor-pointer text-[24px] text-red-400"></i>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="flex items-center gap-2 px-4 py-3">
                      <img
                        src="/mans.png"
                        alt="Product"
                        className="h-10 w-10 rounded-lg"
                      />
                      Wellness Natural Food
                    </td>
                    <td className="px-4 py-3">#126</td>
                    <td className="px-4 py-3">$5.22</td>
                    <td className="px-4 py-3">578</td>
                    <td className="px-4 py-3">--/--</td>
                    <td className="px-4 py-3">$202.87</td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-red-200 px-2 py-1 text-sm text-red-600">
                        Not Available
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <i class="fa-light fa-pen-line mr-[20px] cursor-pointer text-[24px] text-green-500"></i>
                      <i class="fa-light fa-trash cursor-pointer text-[24px] text-red-400"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-5 mt-8 flex items-center justify-between text-sm text-gray-600">
              <p>Showing 5 entries</p>
              <div className="flex items-center gap-2">
                <button className="rounded bg-gray-200 px-3 py-1">◀</button>
                <button className="rounded bg-gray-200 px-3 py-1">1</button>
                <button className="rounded bg-blue-500 px-3 py-1 text-white">
                  2
                </button>
                <button className="rounded bg-gray-200 px-3 py-1">3</button>
                <button className="rounded bg-gray-200 px-3 py-1">▶</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductList;
