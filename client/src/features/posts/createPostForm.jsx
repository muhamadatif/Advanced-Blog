import axios from "axios";
import { Alert, Button, FileInput, Select } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField } from "../../components/FormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "../../schemas/postSchema";
import ReactQuillComponent from "../../components/ReactQuillComponent";
import { CircularProgressbar } from "react-circular-progressbar";
import { useCreatePost } from "./useCreatePost";
import { useImageUpload } from "../../hooks/useImageUpload";
import LoadingButton from "../../components/LoadingButton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import styles

const CreatePostForm = () => {
  const { createPost, isCreating } = useCreatePost();
  const { handleUpload, imageUrl, imageUploadingProgress, imageUploadingEror } =
    useImageUpload();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPostSchema),
    mode: "onBlur",
  });

  const imageFile = watch("image");

  const onSubmit = (data) => {
    createPost({ ...data, image: imageUrl });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {isCreating ? (
        <Skeleton
          height={40}
          borderRadius={8}
          baseColor="#e1e1ee"
          highlightColor="#ffffff"
          duration={1.5}
        />
      ) : (
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          (
          <FormField
            type="text"
            placeholder="title"
            id="title"
            register={register}
            error={errors.title}
            styles="flex-1"
          />
          )(
          <Select {...register("category")}>
            <option value={"uncategorized"}>Select a category</option>
            <option value={"javascript"}>JavaScript</option>
            <option value={"reactjs"}>React.js</option>
            <option value={"nextjs"}>Next.js</option>
          </Select>
          , )
        </div>
      )}

      {isCreating ? (
        <Skeleton
          height={40}
          borderRadius={8}
          baseColor="#dfdcdc"
          highlightColor="#ffffff"
          duration={1.5}
        />
      ) : (
        <div className="flex items-center justify-between gap-4 border-4 border-dotted border-teal-500 p-3">
          (
          <>
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setValue("image", file, { shouldValidate: true });
                trigger("image");
              }}
            />

            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={() => handleUpload(imageFile)}
              disabled={imageUploadingProgress}
            >
              {imageUploadingProgress ? (
                <div className="h-16 w-16">
                  <CircularProgressbar
                    value={imageUploadingProgress}
                    text={`${imageUploadingProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload image"
              )}
            </Button>
          </>
          )
        </div>
      )}
      {errors?.image ||
        (imageUploadingEror && (
          <Alert color="failure">
            {errors?.image?.message || imageUploadingEror}
          </Alert>
        ))}
      {imageUrl && (
        <img src={imageUrl} alt="upload" className="h-72 w-full object-cover" />
      )}
      {isCreating ? (
        <Skeleton
          height={288}
          borderRadius={8}
          baseColor="#dfdcdc"
          highlightColor="#ffffff"
          duration={1.5}
        />
      ) : (
        <ReactQuillComponent
          placeholder="Write something...."
          id="content"
          error={errors?.content}
          onChange={(_, __, ___, editor) => {
            const plainText = editor.getText().trim(); // Extract plain text
            setValue("content", plainText); // ✅ Set value
            clearErrors("content"); // ✅ Remove "Required" error if user starts typing
          }}
          onBlur={() => trigger("content")}
        />
      )}
      <LoadingButton isLoading={isCreating} text="Publish" />
    </form>
  );
};

export default CreatePostForm;
