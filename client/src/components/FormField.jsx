import { Alert, Label, TextInput } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import { useFormContext } from "react-hook-form"; // Import useFormContext

/*eslint-disable */
export const TextFormField = ({
  label,
  id,
  placeholder,
  register,
  isLoading,
  error,
}) => {
  const { trigger } = useFormContext(); // Access trigger function from react-hook-form

  return (
    <div className="flex flex-col">
      <Label htmlFor={id} className="font-medium">
        {label}
      </Label>

      {isLoading ? (
        <Skeleton
          height={40}
          borderRadius={8}
          baseColor="#2a2a2a"
          highlightColor="#3a3a3a"
          duration={1.5}
        />
      ) : (
        <TextInput
          type="text"
          placeholder={placeholder}
          id={id}
          className={`rounded-lg border transition-all duration-300 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-600 focus:ring-blue-500"
          }`}
          {...register(id)}
          onBlur={() => trigger(id)} // ✅ Validate the field on blur
        />
      )}

      {error && (
        <Alert className="mt-1" color="failure">
          {error.message}
        </Alert>
      )}
    </div>
  );
};
