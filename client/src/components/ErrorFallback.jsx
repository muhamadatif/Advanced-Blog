import { Button } from "flowbite-react";
/*eslint-disable */
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="gap6 flex min-h-screen flex-col items-center justify-center gap-6 p-7 text-gray-500">
      <h1 className="text-5xl font-semibold">Something went wrong 🧐</h1>

      <p className="text-2xl">{error.message}</p>
      <Button type="submit" onClick={resetErrorBoundary} outline>
        Try again
      </Button>
    </div>
  );
};

export default ErrorFallback;
