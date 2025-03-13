import { Alert, Button, FileInput, Select } from "flowbite-react";
import { FormField } from "../../components/FormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "../../schemas/postSchema";
import ReactQuillComponent from "../../components/ReactQuillComponent";
import { CircularProgressbar } from "react-circular-progressbar";
import { useCreatePost } from "./useCreatePost";
import { useUpdatePost } from "./useUpdatePost";
import { useImageUpload } from "../../hooks/useImageUpload";
import LoadingButton from "../../components/LoadingButton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import styles
import { useLocation } from "react-router-dom";
import { useState } from "react";

/*eslint-disable*/
const CreateUpdatePostForm = () => {
  const { createPost, isCreating } = useCreatePost();
  const { updatePost, isUpdating } = useUpdatePost();
  const location = useLocation();
  let post = location.state?.post || {};
  const { _id: postId, userId, ...values } = post;
  const [postData, setPostData] = useState(
    Object.keys(values).length > 0 ? values : {},
  );

  const isEditSession = Boolean(postId);

  const isLoading = isCreating || isUpdating;

  const { handleUpload, imageUrl, imageUploadingProgress, imageUploadingEror } =
    useImageUpload();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPostSchema),
    mode: "onBlur",
    defaultValues: {
      content: values?.content || "",
    },
  });

  const imageFile = watch("image");

  const onSubmit = (data) => {
    if (isEditSession) {
      const updateData = { ...postData, image: imageUrl };

      updatePost({ postId, userId, updateData });
    } else {
      createPost({ ...data, image: imageUrl });
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? (
        <Skeleton
          height={40}
          borderRadius={8}
          baseColor="#e1e1ee"
          highlightColor="#ffffff"
          duration={1.5}
        />
      ) : (
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <FormField
            type="text"
            placeholder="title"
            id="title"
            register={register}
            error={errors?.title}
            styles="flex-1"
            value={postData?.title}
            onChange={(e) => {
              setPostData({ ...postData, [e.target.id]: e.target.value });
              setValue("title", e.target.value, { shouldValidate: true });
            }}
            onBlur={() => {
              setValue("content", "", { shouldValidate: true }); // ✅ Ensure validation triggers
              trigger("content");
            }}
          />
          <Select
            {...register("category")}
            id="category"
            value={postData?.category}
            onChange={(e) =>
              setPostData({ ...postData, [e.target.id]: e.target.value })
            }
          >
            <option value={"uncategorized"}>Select a category</option>
            <option value={"javascript"}>JavaScript</option>
            <option value={"reactjs"}>React.js</option>
            <option value={"nextjs"}>Next.js</option>
          </Select>
        </div>
      )}

      {isLoading ? (
        <Skeleton
          height={40}
          borderRadius={8}
          baseColor="#dfdcdc"
          highlightColor="#ffffff"
          duration={1.5}
        />
      ) : (
        <div className="flex items-center justify-between gap-4 border-4 border-dotted border-teal-500 p-3">
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
        </div>
      )}
      {errors?.image ||
        (imageUploadingEror && (
          <Alert color="failure">
            {errors?.image?.message || imageUploadingEror}
          </Alert>
        ))}
      {!imageUrl && postData.image && (
        <img
          src={postData.image}
          alt="upload"
          className="h-72 w-full object-cover"
        />
      )}
      {imageUrl && (
        <img src={imageUrl} alt="upload" className="h-72 w-full object-cover" />
      )}
      {isLoading ? (
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
          value={postData?.content}
          onChange={(content) => {
            const trimmedContent = content.replace(/<(.|\n)*?>/g, "").trim();

            setPostData({ ...postData, content }); // ✅ Update local state
            setValue("content", content, { shouldValidate: true }); // ✅ Sync with form

            // ✅ Trigger validation if content is empty
            if (!trimmedContent) {
              setValue("content", "", { shouldValidate: true });
            }

            trigger("content"); // ✅ Validate on change
          }}
          onBlur={() => {
            const trimmedContent = postData?.content
              ?.replace(/<(.|\n)*?>/g, "")
              .trim();
            if (!trimmedContent) {
              setValue("content", "", { shouldValidate: true }); // ✅ Ensure validation triggers
            }
            trigger("content");
          }}
        />
      )}
      <LoadingButton
        isLoading={isLoading}
        text={isEditSession ? "Update" : "Publish"}
      />
    </form>
  );
};

export default CreateUpdatePostForm;
