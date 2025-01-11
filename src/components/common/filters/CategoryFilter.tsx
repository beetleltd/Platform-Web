import { useGetCategories } from "@/api/store";
import Button from "@/components/shared/Button";
import { useFilterStore } from "@/store/filters";
import { useStoreData } from "@/store/storeData";
import { Menu } from "@headlessui/react";
import { useState } from "react";
import { CiBag1 } from "react-icons/ci";
import FilterButton from "./FilterButton";

type Category = {
  name: string;
  slug: string;
  id: string;
  sub_categories: Category[] | null;
};

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-3">
    {Array(6)
      .fill("")
      .map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-300 rounded w-full mx-auto"
        ></div>
      ))}
  </div>
);

const CategoryFilter = () => {
  const { store } = useStoreData();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
  //   {}
  // );
  const { setFilters } = useFilterStore();

  const {
    data: categories,
    isLoading,
    refetch,
  } = useGetCategories(store?.id || "", {
    enabled: !!store?.id, // Only enable the query if store?.id is not empty
  });

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug)
        ? prev.filter((item) => item !== slug)
        : [...prev, slug]
    );
  };

  // const toggleSubCategories = (slug: string) => {
  //   setOpenCategories((prev) => ({
  //     ...prev,
  //     [slug]: !prev[slug],
  //   }));
  // };

  const handleApply = () => {
    setFilters({ categories: selectedCategories });
  };

  const renderCategories = (categories: Category[]) => {
    return categories?.map((category) => (
      <div key={category.slug} className="flex flex-col gap-2">
        {/* Parent Category */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-reseller-primary"
              checked={selectedCategories.includes(category.id)}
              onChange={() => toggleCategory(category?.id)}
            />
            <span className="text-sm">{category.name}</span>
          </label>

          {/* Toggle Button for Subcategories */}
          {/* {category.sub_categories && (
            <button
              onClick={() => toggleSubCategories(category.slug)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {openCategories[category.slug] ? (
                <FaChevronUp size={14} />
              ) : (
                <FaChevronDown size={14} />
              )}
            </button>
          )}
        </div> */}

          {/* Subcategories */}
          {/* {openCategories[category.slug] && category.sub_categories && (
          <div className="ml-4 border-l pl-4 mt-2">
            {renderCategories(category.sub_categories)}
          </div>
        )} */}
        </div>
      </div>
    ));
  };

  return (
    <div className="relative">
      <Menu>
        {({ open, close }) => (
          <>
            <Menu.Button>
              <FilterButton>
                <div className="flex gap-x-2 items-center">
                  <CiBag1 size={17} />
                  <span>Category</span>
                </div>
              </FilterButton>
            </Menu.Button>

            {/* Category Filter Popup */}
            <Menu.Items
              as="div"
              className="max-h-[600px] overflow-y-auto absolute mt-2 left-0 w-64 bg-white border border-gray-200 rounded-xl shadow-lg focus:outline-none z-10"
            >
              <div className="p-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold text-gray-800">
                    Categories
                  </span>
                </div>

                {/* Category List */}
                <div className="mt-4">
                  {isLoading ? (
                    <SkeletonLoader />
                  ) : (
                    renderCategories(categories || [])
                  )}
                </div>

                <div className="pt-3">
                  <Button
                    onClick={() => {
                      handleApply();
                      close();
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};

export default CategoryFilter;
