import { Alert, Label, TextInput } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import styles

/*eslint-disable */
export const FormField = ({
  label,
  type,
  id,
  placeholder,
  register,
  isLoading,
  error,
  defaultValue = "",
  styles,
}) => {
  return (
    <div className={` ${styles} flex flex-col`}>
      {label && (
        <Label htmlFor={id} className="font-medium">
          {label}
        </Label>
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
        <TextInput
          type={type}
          placeholder={placeholder}
          id={id}
          defaultValue={defaultValue}
          className={`rounded-lg border transition-all duration-300 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-600 focus:ring-blue-500"
          }`}
          {...register(id)}
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
