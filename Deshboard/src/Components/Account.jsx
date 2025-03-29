import React from "react";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
const Account = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <section>
        <div className="mx-auto max-w-[1400px]">
          <h1 className="text-2xl font-medium">Account</h1>
          {/* <div className="py-4 md:py-8">
            <div className="mb-[50px] flex items-center space-x-4">
              <div className="h-52 w-52 border-4 border-red-500 flex items-center justify-center rounded-full p-1">
                <img
                  className="h-40 w-40 rounded-3xl"
                  src="/limon.jpg"
                  alt="Helene avatar"
                />
              </div>
              <div>
                <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 mb-2 inline-block rounded px-2.5 py-0.5 text-xs font-medium">
                  PRO Account
                </span>
                <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                  Mahammud Hassan
                </h2>
              </div>
            </div>
            <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
              <div className="space-y-4">
                <dl className="">
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    Email Address
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    helene@example.com
                  </dd>
                </dl>
                <dl>
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    Home Address
                  </dt>
                  <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <svg
                      className="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                      />
                    </svg>
                    2 Miles Drive, NJ 071, New York, United States of America
                  </dd>
                </dl>
                <dl>
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    Delivery Address
                  </dt>
                  <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <svg
                      className="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                      />
                    </svg>
                    9th St. PATH Station, New York, United States of America
                  </dd>
                </dl>
              </div>
              <div className="space-y-4">
                <dl>
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    Phone Number
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    +1234 567 890 / +12 345 678
                  </dd>
                </dl>
                <dl>
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    Favorite pick-up point
                  </dt>
                  <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <svg
                      className="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 12c.263 0 .524-.06.767-.175a2 2 0 0 0 .65-.491c.186-.21.333-.46.433-.734.1-.274.15-.568.15-.864a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 12 9.736a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 16 9.736c0 .295.052.588.152.861s.248.521.434.73a2 2 0 0 0 .649.488 1.809 1.809 0 0 0 1.53 0 2.03 2.03 0 0 0 .65-.488c.185-.209.332-.457.433-.73.1-.273.152-.566.152-.861 0-.974-1.108-3.85-1.618-5.121A.983.983 0 0 0 17.466 4H6.456a.986.986 0 0 0-.93.645C5.045 5.962 4 8.905 4 9.736c.023.59.241 1.148.611 1.567.37.418.865.667 1.389.697Zm0 0c.328 0 .651-.091.94-.266A2.1 2.1 0 0 0 7.66 11h.681a2.1 2.1 0 0 0 .718.734c.29.175.613.266.942.266.328 0 .651-.091.94-.266.29-.174.537-.427.719-.734h.681a2.1 2.1 0 0 0 .719.734c.289.175.612.266.94.266.329 0 .652-.091.942-.266.29-.174.536-.427.718-.734h.681c.183.307.43.56.719.734.29.174.613.266.941.266a1.819 1.819 0 0 0 1.06-.351M6 12a1.766 1.766 0 0 1-1.163-.476M5 12v7a1 1 0 0 0 1 1h2v-5h3v5h7a1 1 0 0 0 1-1v-7m-5 3v2h2v-2h-2Z"
                      />
                    </svg>
                    Herald Square, 2, New York, United States of America
                  </dd>
                </dl>
                <dl>
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    My Companies
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    FLOWBITE LLC, Fiscal code: 18673557
                  </dd>
                </dl>
                <dl>
                  <dt className="mb-1 font-semibold text-gray-900 dark:text-white">
                    Payment Methods
                  </dt>
                  <dd className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                      <img
                        className="h-4 w-auto dark:hidden"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                        alt=""
                      />
                      <img
                        className="hidden h-4 w-auto dark:flex"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="text-sm">
                        <p className="mb-0.5 font-medium text-gray-900 dark:text-white">
                          Visa ending in 7658
                        </p>
                        <p className="font-normal text-gray-500 dark:text-gray-400">
                          Expiry 10/2024
                        </p>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <button
              type="button"
              data-modal-target="accountInformationModal2"
              data-modal-toggle="accountInformationModal2"
              className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 sm:w-auto"
            >
              <svg
                className="-ms-0.5 me-1.5 h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                ></path>
              </svg>
              Edit your data
            </button>
          </div> */}

          <div>
            <div className="mt-8 flex items-center justify-between rounded-2xl border border-black/30 p-5">
              <div className="flex items-center gap-7">
                <img
                  className="h-28 w-28 rounded-full"
                  src="/limon.jpg"
                  alt="admin image"
                />
                <div>
                  <h4 className="text-2xl font-semibold text-black">
                    Mahammud Hassan Limon
                  </h4>
                  <div className="flex gap-3">
                    <h5 className="text-sm font-normal text-black/50">Admin</h5>
                    <div className="border-r border-black/50"></div>
                    <h5 className="text-sm font-normal text-black/50">
                      Dhaka, Bangladesh
                    </h5>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex gap-[30px]">
                  <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-red-500 text-[24px] text-red-500 duration-300 ease-in-out hover:bg-red-400 hover:text-white">
                    <i class="fa-brands fa-facebook-f"></i>
                  </span>
                  <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-red-500 text-[24px] text-red-500 duration-300 ease-in-out hover:bg-red-400 hover:text-white">
                    <i class="fa-brands fa-x-twitter"></i>
                  </span>
                  <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-red-500 text-[24px] text-red-500 duration-300 ease-in-out hover:bg-red-400 hover:text-white">
                    <i class="fa-brands fa-instagram"></i>
                  </span>
                  <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-red-500 text-[24px] text-red-500 duration-300 ease-in-out hover:bg-red-400 hover:text-white">
                    <i class="fa-brands fa-linkedin-in"></i>
                  </span>
                </div>
                <div>
                  <Button color="red" onClick={handleOpen} variant="gradient">
                    <i class="fa-light fa-pen-line mr-2"></i>
                    <span>Edit</span>
                  </Button>
                  <Dialog
                    size="sm"
                    open={open}
                    handler={handleOpen}
                    className="h-[690px] w-full overflow-y-scroll p-4"
                  >
                    <DialogHeader className="relative m-0 block">
                      <Typography variant="h4" color="blue-gray">
                        Edit Profile
                      </Typography>
                      <Typography className="mt-1 font-normal text-gray-600">
                        Keep your records up-to-date and organized.
                      </Typography>
                      <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute right-3.5 top-3.5"
                        onClick={handleOpen}
                      >
                        <XMarkIcon className="h-4 w-4 stroke-2" />
                      </IconButton>
                    </DialogHeader>
                    <DialogBody className="space-y-4 pb-6">
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Name
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="eg. White Shoes"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <Typography variant="h5" color="blue-gray">
                        Social Media Link
                      </Typography>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Facebook
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="Link"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Instagram
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="Link"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Linkedin
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="Link"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="h4"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          <i class="fa-brands fa-square-x-twitter"></i>
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="Link"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <Typography variant="h5" color="blue-gray">
                        Personal Infomation
                      </Typography>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          E-mail Address
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="Link"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Home Address
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="Link"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Phone
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="Link"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Your Role
                        </Typography>
                        <Select
                          className="focus:!border-primary group-hover:!border-primary !w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-t-blue-gray-900"
                          placeholder="1"
                          labelProps={{
                            className: "hidden",
                          }}
                        >
                          <Option>Admin</Option>
                          <Option>Sub Admin</Option>
                          <Option>Seller</Option>
                        </Select>
                      </div>
                    </DialogBody>
                    <DialogFooter>
                      <Button className="ml-auto" onClick={handleOpen}>
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </div>
              </div>
            </div>
            <div className="bord mt-8 flex items-center gap-[200px] rounded-2xl border border-black/30 p-5">
              <div>
                <h4 className="mb-4 text-2xl font-medium">
                  Personal Information
                </h4>
                <div className="grid grid-rows-4 gap-4">
                  <h4 className="text-sm font-normal">
                    name <span className="mr-3">:</span>
                    <span>Mahammud Hassan Limon</span>
                  </h4>
                  <h4 className="text-sm font-normal">
                    Email <span className="mr-3">:</span>
                    <span>mahammudhassanlimon@gmail.com</span>
                  </h4>
                  <h4 className="text-sm font-normal">
                    Phone <span className="mr-3">:</span>
                    <span>01887604100</span>
                  </h4>
                  <h4 className="text-sm font-normal">
                    Bio <span className="mr-3">:</span>
                    <span>Admin</span>
                  </h4>
                </div>
              </div>
              <div>
                <h4 className="mb-4 text-2xl font-medium">Address</h4>
                <div className="grid grid-rows-4 gap-4">
                  <h4 className="text-sm font-normal">
                    Country <span className="mr-3">:</span>
                    <span>Bangladesh</span>
                  </h4>
                  <h4 className="text-sm font-normal">
                    City/State <span className="mr-3">:</span>
                    <span>Dhaka</span>
                  </h4>
                  <h4 className="text-sm font-normal">
                    Postal Code <span className="mr-3">:</span>
                    <span>1200</span>
                  </h4>
                  <h4 className="text-sm font-normal">
                    TAX ID <span className="mr-3">:</span>
                    <span>AS4568384</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
