export const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};
