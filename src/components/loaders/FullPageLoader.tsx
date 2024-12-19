// FullPageLoader.jsx

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative flex flex-col items-center gap-4">
        {/* Spinner Animation */}
        <div className="w-8 h-8 border-2 border-reseller-light border-t-reseller-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default FullPageLoader;
