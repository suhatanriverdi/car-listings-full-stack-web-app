import ImageUploadIcon from "../../public/svgs/ImageUploadIcon";
import RemoveIcon from "../../public/svgs/RemoveIcon";
import ResetIcon from "../../public/svgs/ResetIcon";
import { FormData } from "../controllers/tradeInFormController";
import CustomButton from "@/components/ui/CustomButton.tsx";
import {
  MileageOption,
  TransmissionOption,
  FuelTypeOption,
} from "@/utils/getFormDataLists";
import React, { ChangeEvent } from "react";
import {
  UseFormRegister,
  FieldValues,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";

// Define prop types for TradeInForm
interface TradeInFormProps {
  register: UseFormRegister<FormData>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: FieldErrors<FieldValues>;
  imageUrls: string[];
  clearImages: () => void;
  imgInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  onSubmit: (data: Record<string, unknown>) => void;
  handleMakeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  carMakes: string[];
  models: string[];
  years: string[];
  getMileageOptions: MileageOption[];
  getTransmissionOptions: TransmissionOption[];
  getFuelTypeOptions: FuelTypeOption[];
  toastMessage: string | null;
}

export default function TradeInForm({
  register,
  handleSubmit,
  errors,
  imageUrls,
  clearImages,
  imgInputRef,
  handleImageUpload,
  removeImage,
  onSubmit,
  handleMakeChange,
  carMakes,
  models,
  years,
  getMileageOptions,
  getTransmissionOptions,
  getFuelTypeOptions,
  toastMessage,
}: TradeInFormProps) {
  return (
    <div className="flex px-[2rem] mt-[2rem] sm:mt-[4rem] sm:px-[3rem] max-w-[62rem] w-full justify-center items-center">
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 md:gap-[8rem] w-full"
      >
        {/* Personal & More Sections */}
        <div className="flex flex-col">
          {/* Personal Information */}
          <h2 className="text-xl font-semibold mb-[0.8rem]">
            Personal Information
          </h2>
          <div className="flex flex-col gap-y-[2rem]">
            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="fullName" className="block">
                  Full Name:
                </label>
                <p className="text-gray-400 text-sm">e.g. John Doe</p>
              </div>
              <input
                id="fullName"
                type="text"
                {...register("fullName")}
                className={`border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } rounded-xl p-2 w-full focus:outline-none focus:border-button-bg-dark focus:ring-button-bg-dark`}
              />
              {errors.fullName && (
                <p className="text-red-500">
                  {errors.fullName.message as string}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="phone" className="block">
                  Phone:
                </label>
                <p className="text-gray-400 text-sm">e.g. 90 542 562 1453</p>
              </div>
              <input
                autoComplete="on"
                id="phone"
                type="tel"
                {...register("phone")}
                className={`border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-xl p-2 w-full focus:outline-none focus:border-button-bg-dark focus:ring-button-bg-dark`}
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message as string}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="email" className="block">
                  Email:
                </label>
                <p className="text-gray-400 text-sm">
                  e.g. johndoewhite@gmail.com
                </p>
              </div>
              <input
                autoComplete="on"
                id="email"
                type="email"
                {...register("email")}
                className={`border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-xl p-2 w-full focus:outline-none focus:border-button-bg-dark focus:ring-button-bg-dark`}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message as string}</p>
              )}
            </div>
          </div>

          {/* More Information */}
          <h2 className="text-xl font-semibold pt-[4rem] mb-[0.8rem]">
            More Information
          </h2>
          <div className="flex flex-col gap-y-[2rem]">
            {/* Extra Information Fields */}
            <div>
              <label htmlFor="interiorFeatures" className="block">
                Interior Features:
              </label>
              <textarea
                id="interiorFeatures"
                {...register("interiorFeatures")}
                className={`border ${
                  errors.interiorFeatures ? "border-red-500" : "border-gray-300"
                } rounded-xl p-2 w-full focus:outline-none focus:border-button-bg-dark focus:ring-button-bg-dark`}
              />
            </div>

            <div>
              <label htmlFor="safetyFeatures" className="block">
                Safety Features:
              </label>
              <textarea
                id="safetyFeatures"
                {...register("safetyFeatures")}
                className={`border ${
                  errors.safetyFeatures ? "border-red-500" : "border-gray-300"
                } rounded-xl p-2 w-full focus:outline-none focus:border-button-bg-dark focus:ring-button-bg-dark`}
              />
            </div>

            <div>
              <label htmlFor="serviceHistory" className="block">
                Service History:
              </label>
              <textarea
                id="serviceHistory"
                {...register("serviceHistory")}
                className={`border ${
                  errors.serviceHistory ? "border-red-500" : "border-gray-300"
                } rounded-xl p-2 w-full focus:outline-none focus:border-button-bg-dark focus:ring-button-bg-dark`}
              />
            </div>
          </div>
        </div>

        {/* Car, Image & Submit Sections */}
        <div className="flex flex-col">
          {/* Car Information */}
          <h2 className="text-xl font-semibold mb-[0.8rem] pt-[4rem] md:pt-[0rem]">
            Car Information
          </h2>
          <div className="flex flex-col gap-y-[2rem]">
            {/* Car Make Selection */}
            <div>
              <label htmlFor="make" className="block">
                Car Make:
              </label>
              <select
                id="make"
                {...register("make")}
                onChange={handleMakeChange}
                className={`border ${
                  errors.make ? "border-red-500" : "border-gray-300"
                } rounded-xl w-full p-[12px]`}
              >
                <option value="">Select Make</option>
                {carMakes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
              {errors.make && (
                <p className="text-red-500">{errors.make.message as string}</p>
              )}
            </div>

            {/* Car Model Selection */}
            <div>
              <label htmlFor="model" className="block">
                Model:
              </label>
              <select
                id="model"
                {...register("model")}
                className={`border ${
                  errors.model ? "border-red-500" : "border-gray-300"
                } rounded-xl w-full p-[12px]`}
              >
                <option value="">Select Model</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              {errors.model && (
                <p className="text-red-500">{errors.model.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="year" className="block">
                Year:
              </label>
              <select
                id="year"
                {...register("year")}
                className={`border ${
                  errors.year ? "border-red-500" : "border-gray-300"
                } rounded-xl p-[12px] w-full`}
              >
                <option value="">Select year</option>
                {years.map((i) => (
                  <option key={i + 1900} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              {errors.year && (
                <p className="text-red-500">{errors.year.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="mileage" className="block">
                Mileage:
              </label>
              <select
                id="mileage"
                {...register("mileage")}
                className={`border ${
                  errors.mileage ? "border-red-500" : "border-gray-300"
                } rounded-xl w-full p-[12px]`}
              >
                <option value="">Select Mileage</option>
                {getMileageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.mileage && (
                <p className="text-red-500">
                  {errors.mileage.message as string}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="transmission" className="block">
                Transmission:
              </label>
              <select
                id="transmission"
                {...register("transmission")}
                className={`border ${
                  errors.transmission ? "border-red-500" : "border-gray-300"
                } rounded-xl w-full p-[12px]`}
              >
                <option value="">Select Transmission</option>
                {getTransmissionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.transmission && (
                <p className="text-red-500">
                  {errors.transmission.message as string}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="fuelType" className="block">
                Fuel Type:
              </label>
              <select
                id="fuelType"
                {...register("fuelType")}
                className={`border ${
                  errors.fuelType ? "border-red-500" : "border-gray-300"
                } rounded-xl w-full p-[12px]`}
              >
                <option value="">Select Fuel Type</option>
                {getFuelTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.fuelType && (
                <p className="text-red-500">
                  {errors.fuelType.message as string}
                </p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col justify-center items-center sm:items-end mt-[2rem]">
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center">
                <div className="flex justify-center gap-1 items-center">
                  <ImageUploadIcon size={20} />
                  <label className="pt-1 font-normal" htmlFor="images">
                    Upload Images:
                  </label>
                </div>
                <div className="flex justify-center gap-1 items-center">
                  <ResetIcon size={20} />
                  <button
                    type="button"
                    onClick={clearImages}
                    className="pt-1 flex justify-center items-center"
                  >
                    Clear Images
                  </button>
                </div>
              </div>
              <input
                ref={imgInputRef}
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="p-2 border rounded-xl w-full cursor-pointer hover:border-button-bg-dark"
              />
              <div className="flex flex-wrap gap-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative mt-2">
                    <img
                      src={url}
                      alt="uploaded"
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute p-[0.18rem] top-[0.3rem] right-[0.3rem] bg-rose-400 hover:bg-pink-500 bg-opacity-90 text-white rounded-full"
                    >
                      <RemoveIcon size={20} />
                    </button>
                  </div>
                ))}
              </div>
              {errors.imageUrls && (
                <p className="text-red-500">
                  {errors.imageUrls.message as string}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-[4rem] justify-center items-center">
              <CustomButton
                type="submit"
                children={"Submit"}
                disabled={toastMessage !== null}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
