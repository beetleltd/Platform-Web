import { useResponsive } from "@/hooks/useResponsive";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = () => {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <div className="flex-1 ">
        <IoSearchOutline className="mx-auto text-3xl text-gray-700 mb-2" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center">
      <div className="relative w-[90%] mx-auto">
        <input
          type="text"
          placeholder="Search..."
          className="px-5 py-3 border rounded-full w-full outline-none "
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
          <IoSearchOutline className="h-6 w-6 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
