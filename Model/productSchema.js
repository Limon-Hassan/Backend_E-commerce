let mongoose = require('mongoose');

let productModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
    },
    brand: {
      type: String,
    },
    description: {
      type: String,
      require: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isTopProduct: {
      type: Boolean,
      default: false,
    },
    Photo: {
      type: Array,
      require: [true, 'one image should needed'],
    },
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review',
      },
    ],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    stock: {
      type: String,
    },
    price: {
      type: Number,
      require: true,
    },
    Discountprice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('products', productModel);

{
  /* <div className="flex gap-[30px] items-center">
            <div>
              <div className="w-[270px] h-[250px] bg-[#F5F5F5] items-center justify-center flex rounded-[4px] relative group overflow-hidden">
                <div className="text-[12px] font-Poppipns_FONT bg-[#DB4444] py-[8px] px-[12px] font-medium text-[#FAFAFA] leading-[18px] rounded-[4px] absolute top-[12px] left-[12px]">
                  -40%
                </div>
                <img src="/image_1.png" alt="image_1" />
                <div className="w-[34px] h-[34px] rounded-full bg-[#FFFFFF] flex items-center justify-center mt-[-190px] ml-[200px] absolute">
                  <i class="fa-regular fa-heart cursor-pointer"></i>
                </div>
                <button class="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-[16px] leading-6 font-Poppipns_FONT font-medium transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Add To Cart
                </button>
              </div>
              <h3 className="text-[18px] font-Poppipns_FONT font-medium leading-6 text-[#000000] mt-[16px] mb-[10px]">
                HAVIT HV-G92 Gamepad
              </h3>
              <div className="flex gap-[12px] items-center mb-[10px]">
                <span className="text-[16px] font-Poppipns_FONT font-bold text-[#DB4444] ">
                  $120
                </span>
                <span className="text-[16px] font-Poppipns_FONT font-bold text-[#000000]/50 line-through">
                  $160
                </span>
              </div>
              <div className="flex gap-[10px]">
                <span className="text-[#FFAD33] flex">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </span>
                <span className="text-[14px] font-Poppipns_FONT font-semibold leading-[21px] text-[#000000]/50">
                  (88)
                </span>
              </div>
            </div>
            <div>
              <div className="w-[270px] h-[250px] bg-[#F5F5F5] items-center justify-center flex rounded-[4px] relative group overflow-hidden">
                <div className="text-[12px] font-Poppipns_FONT bg-[#DB4444] py-[8px] px-[12px] font-medium text-[#FAFAFA] leading-[18px] rounded-[4px] absolute top-[12px] left-[12px]">
                  -35%
                </div>
                <img src="/keyboard.png" alt="keyboard" />
                <div className="w-[34px] h-[34px] rounded-full bg-[#FFFFFF] flex items-center justify-center mt-[-190px] ml-[200px] absolute">
                  <i class="fa-regular fa-heart cursor-pointer"></i>
                </div>
                <button class="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-[16px] leading-6 font-Poppipns_FONT font-medium transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Add To Cart
                </button>
              </div>
              <h3 className="text-[18px] font-Poppipns_FONT font-medium leading-6 text-[#000000] mt-[16px] mb-[10px]">
                AK-900 Wired Keyboard
              </h3>
              <div className="flex gap-[12px] items-center mb-[10px]">
                <span className="text-[16px] font-Poppipns_FONT font-bold text-[#DB4444] ">
                  $960
                </span>
                <span className="text-[16px] font-Poppipns_FONT font-bold text-[#000000]/50 line-through">
                  $1160
                </span>
              </div>
              <div className="flex gap-[10px]">
                <span className="text-[#FFAD33] flex">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </span>
                <span className="text-[14px] font-Poppipns_FONT font-semibold leading-[21px] text-[#000000]/50">
                  (88)
                </span>
              </div>
            </div>
            <div>
              <div className="w-[270px] h-[250px] bg-[#F5F5F5] items-center justify-center flex rounded-[4px] relative group overflow-hidden">
                <div className="text-[12px] font-Poppipns_FONT bg-[#DB4444] py-[8px] px-[12px] font-medium text-[#FAFAFA] leading-[18px] rounded-[4px] absolute top-[12px] left-[12px]">
                  -30%
                </div>
                <img src="/monitor.png" alt="monitor" />
                <div className="w-[34px] h-[34px] rounded-full bg-[#FFFFFF] flex items-center justify-center mt-[-190px] ml-[200px] absolute">
                  <i class="fa-regular fa-heart cursor-pointer"></i>
                </div>
                <button class="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-[16px] leading-6 font-Poppipns_FONT font-medium transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Add To Cart
                </button>
              </div>
              <h3 className="text-[18px] font-Poppipns_FONT font-medium leading-6 text-[#000000] mt-[16px] mb-[10px]">
                IPS LCD Gaming Monitor
              </h3>
              <div className="flex gap-[12px] items-center mb-[10px]">
                <span className="text-[16px] font-Poppipns_FONT font-bold text-[#DB4444] ">
                  $120
                </span>
                <span className="text-[16px] font-Poppipns_FONT font-bold text-[#000000]/50 line-through">
                  $160
                </span>
              </div>
              <div className="flex gap-[10px]">
                <span className="text-[#FFAD33] flex">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </span>
                <span className="text-[14px] font-Poppipns_FONT font-semibold leading-[21px] text-[#000000]/50">
                  (88)
                </span>
              </div>
            </div>
            <div>
              <div className="w-[270px] h-[250px] bg-[#F5F5F5] items-center justify-center flex rounded-[4px] relative group overflow-hidden">
                <div className="text-[12px] font-Poppipns_FONT bg-[#DB4444] py-[8px] px-[12px] font-medium text-[#FAFAFA] leading-[18px] rounded-[4px] absolute top-[12px] left-[12px]">
                  -20%
                </div>
                <img src="/chair.png" alt="chair" />
                <div className="w-[34px] h-[34px] rounded-full bg-[#FFFFFF] flex items-center justify-center mt-[-190px] ml-[200px] absolute">
                  <i class="fa-regular fa-heart cursor-pointer"></i>
                </div>
                <button class="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-[16px] leading-6 font-Poppipns_FONT font-medium transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Add To Cart
                </button>
              </div>
              <h3 className="text-[18px] font-Poppipns_FONT font-medium leading-6 text-[#000000] mt-[16px] mb-[10px]">
                S-Series Comfort Chair
              </h3>
              <div className="flex gap-[12px] items-center mb-[10px]">
                <span className="text-[16px] font-Poppipns_FONT font-bold text-[#DB4444] ">
                  $120
                </span>
                <span className="text-[16px] font-Poppipns_FONT font-bold text-[#000000]/50 line-through">
                  $160
                </span>
              </div>
              <div className="flex gap-[10px]">
                <span className="text-[#FFAD33] flex">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </span>
                <span className="text-[14px] font-Poppipns_FONT font-semibold leading-[21px] text-[#000000]/50">
                  (88)
                </span>
              </div>
            </div>
          </div> */
}
