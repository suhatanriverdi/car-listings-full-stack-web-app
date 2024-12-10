import useFormStore from "@/store/FormStore";
import {
  years,
  getCarMakes,
  getCarModelsByMake,
  getMileageOptions,
  getTransmissionOptions,
  getFuelTypeOptions,
} from "@/utils/getFormDataLists";
import useSubmitDataToBackend from "@/utils/sender";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z
    .string()
    .min(1, "Year is required")
    .refine(
      (val) => {
        const year = parseInt(val);
        return year >= 1900 && year <= new Date().getFullYear();
      },
      {
        message: "Year must be between 1900 and the current year",
      }
    ),
  mileage: z
    .string()
    .min(1, "Mileage is required")
    .regex(/^\d+$/, "Mileage must be a number"),
  imageUrls: z
    .array(z.string().url("Invalid URL format"))
    .min(1, "At least one image is required")
    .max(5, "You can upload a maximum of 5 images"),
  transmission: z.string().min(1, "Transmission type is required"),
  fuelType: z.string().min(1, "Fuel type is required"),
  interiorFeatures: z.string().optional(),
  safetyFeatures: z.string().optional(),
  serviceHistory: z.string().optional(),
});

export type FormData = {
  fullName: string;
  phone: string;
  email: string;
  make: string;
  model: string;
  year: string;
  mileage: string;
  imageUrls: string[];
  transmission: string;
  fuelType: string;
  interiorFeatures?: string;
  safetyFeatures?: string;
  serviceHistory?: string;
};

export function useFormController() {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      imageUrls: [],
    },
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + imageUrls.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    const newImageUrls = files.map((file) => URL.createObjectURL(file));

    setImageUrls((prev) => {
      const updatedUrls = [...prev, ...newImageUrls];
      // Make sure to sync with form state
      setValue("imageUrls", [...imageUrls, ...newImageUrls]);
      return updatedUrls;
    });

    if (errors.imageUrls) {
      // Clear the error if images are uploaded
      clearErrors("imageUrls");
    }
  };

  const removeImage = (index: number) => {
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedUrls);
    setValue("imageUrls", updatedUrls);
  };

  const imgInputRef = useRef<HTMLInputElement>(null);
  const clearImages = () => {
    setImageUrls([]);
    setValue("imageUrls", []);
    // Clear the selected files using useRef
    if (imgInputRef.current) {
      // This clears the selected files
      imgInputRef.current.value = "";
    }
  };

  const mileageOptions = getMileageOptions();
  const transmissionOptions = getTransmissionOptions();
  const fuelTypeOptions = getFuelTypeOptions();

  const carMakes = getCarMakes();
  const [models, setModels] = useState<string[]>([]);
  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const make = e.target.value;
    setModels(getCarModelsByMake(make));
    clearErrors("make");
  };

  // Extract the car data from the location state
  const location = useLocation();
  const { carId = "", userId = "" } =
    (location.state as { carId: string; userId: string }) || {};

  const parsedUserId = parseInt(userId, 10);
  // Handle form submission hook
  const submitData = useSubmitDataToBackend();
  const onSubmit = (data: Record<string, unknown>) => {
    submitData({ ...data, carId, userId: parsedUserId, status: "pending" });
  };

  const { toastMessage } = useFormStore();

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    imageUrls,
    setImageUrls,
    clearImages,
    imgInputRef,
    handleImageUpload,
    removeImage,
    onSubmit,
    handleMakeChange,
    carMakes,
    models,
    years,
    mileageOptions,
    transmissionOptions,
    fuelTypeOptions,
    toastMessage,
  };
}
