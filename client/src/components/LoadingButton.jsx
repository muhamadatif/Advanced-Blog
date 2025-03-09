import { Button, Spinner } from "flowbite-react";
/*eslint-disable */
const LoadingButton = ({ isLoading, text, outline = false }) => {
  return (
    <Button
      gradientDuoTone="purpleToPink"
      type="submit"
      className={`transition-all duration-300 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
      disabled={isLoading}
      outline
    >
      {isLoading ? (
        <>
          <Spinner size="sm" />
          <span className="pl-3">Loading...</span>
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default LoadingButton;
