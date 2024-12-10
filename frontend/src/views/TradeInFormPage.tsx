// Form Controller
import { useFormController } from "../controllers/tradeInFormController.tsx";
// Form UI
import TradeInForm from "@/components/TradeInForm.tsx";

export default function TradeInFormPage() {
  const {
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
    mileageOptions,
    transmissionOptions,
    fuelTypeOptions,
    toastMessage,
  } = useFormController();

  return (
    <TradeInForm
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      imageUrls={imageUrls}
      clearImages={clearImages}
      imgInputRef={imgInputRef}
      handleImageUpload={handleImageUpload}
      removeImage={removeImage}
      onSubmit={onSubmit}
      handleMakeChange={handleMakeChange}
      carMakes={carMakes}
      models={models}
      years={years}
      getMileageOptions={mileageOptions}
      getTransmissionOptions={transmissionOptions}
      getFuelTypeOptions={fuelTypeOptions}
      toastMessage={toastMessage}
    />
  );
}
