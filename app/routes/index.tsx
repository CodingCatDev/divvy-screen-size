import { useState } from "react";
import DropDown from "~/components/DropDown";
import Data from "~/components/Data";
import CloudinaryImage from "~/components/CloudinaryImage";

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
              <Data
                menuBarHeight={menuBarHeight}
                width={width}
                height={height}
                getScreenWidth={getScreenWidth}
                getScreenHeight={getScreenHeight}
                getScreenMargin={getScreenMargin}
                getBoxSize={getBoxSize}
              />
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  // onClick={() => generateCodingCatCoverURL()}
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
                  target="_blank"
                >
                  GitHub Link
                </a>
              </div>
            </form>
            <div className="flex flex-col px-8 pt-6 pb-8 mb-4 bg-blue-300 rounded shadow-md">
              <h2 className="text-2xl text-white">Preview Image</h2>
              <CloudinaryImage
                menuBarHeight={menuBarHeight}
                width={width}
                height={height}
                getScreenWidth={getScreenWidth}
                getScreenHeight={getScreenHeight}
                getScreenMargin={getScreenMargin}
                getBoxSize={getBoxSize}
                columns={columns}
                rows={rows}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
