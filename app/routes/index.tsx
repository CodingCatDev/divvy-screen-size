import { Fragment, useState } from "react";
import { Listbox, Transition, Disclosure } from "@headlessui/react";
import { CheckIcon, SelectorIcon, ChevronUpIcon } from "@heroicons/react/solid";

export default function Index() {
  const [menuBarHeight, setMenuBarHeight] = useState(24);
  const [width, setWidth] = useState(3840);
  const [height, setHeight] = useState(2160);

  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(2);

  const getScreenHeight = () => {
    return height - menuBarHeight;
  };

  const getScreenWidth = () => {
    const originalRatio = width / height; //aka 16:9
    return originalRatio * (height - menuBarHeight);
  };

  const getScreenMargin = () => {
    return width - getScreenWidth();
  };

  const getBoxSize = () => {
    return {
      width: (width - getScreenMargin()) / columns,
      height: getScreenHeight() / rows,
    };
  };
  const Data = () => {
    return (
      <div className="my-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>Data</span>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-blue-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                {menuBarHeight && height && (
                  <div className="flex justify-between">
                    <p>Screen Height: </p>
                    <p>
                      {(
                        Math.round((getScreenHeight() + Number.EPSILON) * 100) /
                        100
                      ).toFixed(2)}
                    </p>
                  </div>
                )}
                {menuBarHeight && width && height && (
                  <div className="flex justify-between">
                    <p>Screen Width: </p>
                    <p className="self-end ">
                      {(
                        Math.round((getScreenWidth() + Number.EPSILON) * 100) /
                        100
                      ).toFixed(2)}
                    </p>
                  </div>
                )}
                {width && height && (
                  <div className="flex justify-between">
                    <p>Margins (Window Left and Right): </p>
                    <p className="self-end ">
                      {(
                        Math.round(
                          (getScreenMargin() / 2 + Number.EPSILON) * 100
                        ) / 100
                      ).toFixed(2)}
                    </p>
                  </div>
                )}
                {width && height && (
                  <div className="flex justify-between">
                    <p>Box (x4): </p>
                    <p className="self-end ">
                      {(
                        Math.round(
                          (getBoxSize().width + Number.EPSILON) * 100
                        ) / 100
                      ).toFixed(2)}
                      {" x "}
                      {(
                        Math.round(
                          (getBoxSize().height + Number.EPSILON) * 100
                        ) / 100
                      ).toFixed(2)}
                    </p>
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    );
  };

  return (
    <>
      <section className="flex justify-center mt-8">
        <div className="flex">
          <div className="w-full max-w-xl">
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="menuBarHeight"
                >
                  Menu Bar Height px
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="number"
                  id="menuBarHeight"
                  value={menuBarHeight}
                  onChange={(e) =>
                    setMenuBarHeight(e.currentTarget.value as unknown as number)
                  }
                />
              </div>
              <div className="flex mb-4">
                <div className="w-full">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="width"
                  >
                    <p>Screen Width px</p>
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="number"
                    id="width"
                    value={width}
                    onChange={(e) =>
                      setWidth(e.currentTarget.value as unknown as number)
                    }
                  />
                </div>
                <div className="w-full">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="height"
                  >
                    <p>Screen Height px</p>
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="number"
                    id="height"
                    value={height}
                    onChange={(e) =>
                      setHeight(e.currentTarget.value as unknown as number)
                    }
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="flex flex-col w-full">
                  <label
                    className="block mb-1 text-sm font-bold text-gray-700"
                    htmlFor="rows"
                  >
                    Rows
                  </label>
                  <DropDown value={rows} func={setRows} id="rows" />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    className="block mb-1 text-sm font-bold text-gray-700"
                    htmlFor="rows"
                  >
                    Columns
                  </label>
                  <DropDown value={columns} func={setColumns} id="columns" />
                </div>
              </div>
              <Data />
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Get Divvy Layout
                </button>
              </div>
              <div className="flex flex-col mt-4 text-xs text-center">
                <p className="text-gray-500 ">
                  &copy;2022{" "}
                  <a
                    href="https://codingcat.dev"
                    className="text-gray-700 underline"
                    target="_blank"
                  >
                    CodingCat.dev
                  </a>{" "}
                  All rights reserved.
                </p>
                <p className="text-gray-500">
                  (well not really steal all this code please!)
                </p>
                <a
                  href="https://github.com/CodingCatDev/divvy-screen-size.git"
                  className="text-gray-700 underline"
                >
                  GitHub Link
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section></section>
    </>
  );
}

const DropDown = ({
  value,
  func,
  id,
  className,
}: {
  value: number;
  func: React.Dispatch<React.SetStateAction<number>>;
  id?: string;
  className?: string;
}) => {
  const rowColumnSelect = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className={className ? className : "w-full"} id={id ? id : ""}>
      <Listbox value={value} onChange={func}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{value}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {rowColumnSelect.map((i, iIdx) => (
                <Listbox.Option
                  key={iIdx}
                  className={({ active }) =>
                    `${active ? "text-blue-900 bg-blue-100" : "text-gray-900"}
                        cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={i}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {i}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? "text-blue-600" : "text-blue-600"
                          }
                              absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
