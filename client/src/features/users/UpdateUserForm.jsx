import { Alert, Button } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "../../schemas/userSchema";
import { useUpdateUser } from "./useUpdateUser";
import { FormField } from "../../components/FormField";
import toast from "react-hot-toast";
import LoadingButton from "../../components/LoadingButton";
import { useImageUpload } from "../../hooks/useImageUpload";

function UpdateUserForm() {
  const { currentUser } = useSelector((state) => state.user);
  const { isUpdating, updateUser } = useUpdateUser();
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const { handleUpload, imageUploadingProgress, imageUrl } = useImageUpload();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(updateUserSchema), mode: "onBlur" });
  const filePickerRef = useRef();

  const imageFile = watch("profilePicture");

  useEffect(() => {
    if (imageFile) {
      handleUpload(imageFile);
    }
  }, [imageFile, handleUpload]);

  const onSubmit = async (data) => {
    if (imageUploadingProgress) {
      toast.error("Please wait for image to upload");

      return;
    }

    const formData = { ...data, profilePicture: imageUrl };

    const userData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value),
    );
    console.log(userData);

    if (
      userData.username === currentUser.username &&
      userData.email === currentUser.email &&
      !userData.password &&
      !userData.profilePicture
    ) {
      toast.error("No changes detected");
      return;
    }
    updateUser({ userId: currentUser._id, userData });
    reset();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="file"
        accept="image/*"
        ref={filePickerRef}
        hidden
        onChange={(e) => {
          const file = e.target.files[0];
          setImageFileUrl(URL.createObjectURL(file));
          setValue("profilePicture", file, { shouldValidate: true });
          trigger("profilePicture");
        }}
      />

      <div
        className="relative h-32 w-32 cursor-pointer self-center rounded-full shadow-md"
        onClick={() => filePickerRef?.current?.click()}
      >
        {imageUploadingProgress > 0 && imageUploadingProgress <= 100 && (
          <CircularProgressbar
            value={imageUploadingProgress}
            text={`${imageUploadingProgress}%`}
            strokeWidth={5}
            styles={{
              root: {
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              },
              path: {
                stroke: `rgba(62,152,199),${imageUploadingProgress / 100}`,
              },
            }}
          />
        )}
        <img
          src={imageFileUrl || currentUser.profilePicture}
          alt="user"
          className={`h-full w-full max-w-[100%] rounded-full border-8 border-[lightgray] object-cover ${
            imageUploadingProgress &&
            imageUploadingProgress < 100 &&
            "opacity-60"
          }`}
        />
      </div>

      {errors?.profilePicture && (
        <Alert className="mt-1" color="failure">
          {errors?.profilePicture?.message}
        </Alert>
      )}

      <FormField
        type="text"
        id="username"
        placeholder="username"
        defaultValue={currentUser.username}
        register={register}
        error={errors.username}
        isLoading={isUpdating}
      />
      <FormField
        type="email"
        id="email"
        placeholder="Email"
        defaultValue={currentUser.email}
        register={register}
        error={errors.email}
        isLoading={isUpdating}
      />
      <FormField
        type="password"
        id="password"
        placeholder="***********"
        defaultValue={currentUser.password}
        register={register}
        error={errors.password}
        isLoading={isUpdating}
      />

      <LoadingButton isLoading={isUpdating} text="Update" />
      {currentUser.isAdmin && (
        <Link to="/create-post">
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            className="w-full"
          >
            Create a post
          </Button>
        </Link>
      )}
    </form>
  );
}

export default UpdateUserForm;
