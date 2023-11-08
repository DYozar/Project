import Link from "next/link";
import { GetCategories } from "@/GraphQL/queries";
import { useState, useEffect, useRef } from "react";
import { CgMenuMotion } from "@react-icons/all-files/Cg/CgMenuMotion";
import { CgClose } from "@react-icons/Cg/CgClose";
import Search from "../Search/Search";
import ButtomBar from "../Footer/ButtomBar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const navBarRef = useRef(null);
  const ulRef = useRef(null);

  const toggleCategory = (categoryId) => {
    if (openCategory === categoryId) {
      setOpenCategory(null); // Close the clicked category if it's already open
    } else {
      setOpenCategory(categoryId); // Open the clicked category
    };
  };

  useEffect(() => {
    const ulRefs = ulRef.current;
    const navRef = navBarRef.current;

    const handleScroll = () => {
      if (window.scrollY > 100) {
        navRef.classList.remove('bg-gray-50', 'text-gray-900');
        navRef.classList.add('bg-gray-900', 'text-gray-50');
      } else {
        navRef.classList.remove('bg-gray-900', 'text-gray-50');
        navRef.classList.add('text-gray-900', 'bg-gray-50');
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMobileMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newCategories = await GetCategories();
        setCategories(newCategories);
      } catch (error) {
        console.error("Error fetching categories nav:", error);
      }
    };

    fetchData();

    const handleBodyOverflow = () => {
      document.body.style.overflow = open ? "hidden" : "";
    };

    handleBodyOverflow();

    window.addEventListener("resize", handleBodyOverflow);

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="m-0 p-0 z-50 shadow-md sticky top-0" ref={navBarRef}>
      <nav className="py-2 px-6 md:py-3 transition duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-[24px] md:text-3xl font-bold">
            <Link href="/" className=" font-mono text-[24px]">insight medium</Link>
          </h2>
          <div className="flex items-center space-x-6">
            {/** <ul className="space-x-6 hidden lg:flex md:flex" ref={ulRef}>
              <li>
                <Link href="/finance" className="hover:underline underline-offset-8">
                  Newsletters
                </Link>
              </li>
              <li>
                <Link href="/Privacy-Policy" className="hover:underline underline-offset-8">
                  Contact
                </Link>
              </li>
            </ul>
            <button className="hidden sm:inline gradient-bg text-white hover:text-black hover:animate-pulse py-2 px-4 rounded-full cursor-pointer transition duration-300">
              Subscribe
            </button>*/}
            <button onClick={closeMobileMenu} className="">
              {open ? (
                <CgClose className="stroke-1 text-xl text-black w-8 h-10" />
              ) : (
                <CgMenuMotion className="stroke-1 text-xl w-8 h-10" />
              )}
            </button>
          </div>
        </div>
      </nav>
      {open && (
        <div className={`absolute top-0 w-full bg-slate-300 h-screen overflow-auto overscroll-auto flex-row justify-center items-center z-10`}>
          <div className={`lg:flex-row w-full h-[93vh] rounded p-5 flex max-sm:flex-col md:flex-col flex-row-reverse lg:justify-start max-md:flex-col lg:space-x-2 bg-white text-black overflow-y-auto overscroll-y-auto`}>
            <button onClick={closeMobileMenu} className="self-start max-md:self-end max-sm:order-1 md:self-end lg:order-2 lg:self-start max-sm:self-end">
              {open ? (
                <CgClose className="stroke-1 text-xl text-black w-8 h-10" />
              ) : (
                <CgMenuMotion className="stroke-1 text-xl w-8 h-10 c" />
              )}
            </button>
            <div className="relative w-full lg:order-first max-sm:order-2 max-sm:h-fit lg:h-full max-md:w-full items-start max-sm:w-full md:w-full">
              <div className="my-5">
                <Search closeMobileMenu={closeMobileMenu} />
              </div>
              <div className="sm:hidden md:hidden lg:hidden">
                {categories.map((category) => (
                  <div key={category.id} className="relative mx-4 my-4">
                    <h1 className="text-[24px] text-gray-900 font-semibold">
                      <button onClick={() => toggleCategory(category.id)}>
                        {openCategory === category.id ? "-" : "+"}
                      </button>{" "}
                      <Link href={`/${category.attributes.CategorySlug}`} onClick={closeMobileMenu}>
                        {category.attributes.Title}
                      </Link>
                    </h1>
                    {openCategory === category.id && (
                      <div className="relative">
                        {category.attributes.sub_categories ? (
                          <ul className="space-y-1 py-2">
                            {category.attributes.sub_categories.data.map((sub, subIndex) => (
                              <li key={subIndex} className="ml-4">
                                <Link
                                  href={`/[CategorySlug]/[sSlug]`}
                                  as={`/${category.attributes.CategorySlug}/${sub.attributes.sSlug}`}
                                  className="text-gray-700 text-[15px] hover:underline underline-offset-8"
                                  onClick={closeMobileMenu}
                                >
                                  {sub.attributes.Title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No sub-categories available</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="transition ease-in-out delay-150 max-sm:hidden lg:grid lg:grid-cols-3 justify-items-center">
                {categories.map((category) => (
                  <div key={category.id} className="relative mx-4 my-4" onClick={closeMobileMenu}>
                    <h1 className="text-[26px] text-gray-900 font-semibold hover:text-gray-700">
                      <Link href={`/${category.attributes.CategorySlug}`}>
                        {category.attributes.Title}
                      </Link>
                    </h1>
                    <div className="relative">
                      {category.attributes.sub_categories ? (
                        <ul className="space-y-1 py-2">
                          {category.attributes.sub_categories.data.map((sub, subIndex) => (
                            <li key={subIndex} className="">
                              <Link
                                href={`/[CategorySlug]/[sSlug]`}
                                as={`/${category.attributes.CategorySlug}/${sub.attributes.sSlug}`}
                                className="text-gray-700 text-[14px] hover:underline underline-offset-8 decoration-gray-700"
                                onClick={closeMobileMenu}
                              >
                                {sub.attributes.Title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No sub-categories available</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/**<div className="w-1/4 max-sm:w-full max-md:w-full max-sm:order-3 bg-red-300 flex justify-center items-start">
              <div className="max-sm:w-full text-[12px]">
                <h1>content</h1>
              </div>
            </div>*/}
          </div>
          <ButtomBar closeMobileMenu={closeMobileMenu}/>
        </div>
      )}
    </div>
  );
}