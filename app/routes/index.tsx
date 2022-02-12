import { useEffect, useState } from "react";
import DropDown from "~/components/DropDown";
import Data from "~/components/Data";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { getCloudinaryImage } from "~/utilities/cloudinary";
import { useLocalStorage } from "usehooks-ts";

export default function Index() {
  const [menuBarHeight, setMenuBarHeight] = useLocalStorage(
    "menuBarHeight",
    24
  );
  const [width, setWidth] = useLocalStorage("width", 3840);
  const [height, setHeight] = useLocalStorage("height", 2160);
  const [rows, setRows] = useLocalStorage("rows", 2);
  const [columns, setColumns] = useLocalStorage("columns", 2);

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

  const generateDownload = () => {
    const url = getCloudinaryImage({
      menuBarHeight,
      width,
      height,
      getScreenHeight,
      getScreenMargin,
      getBoxSize,
      rows,
      columns,
    })
      .format("jpg")
      .quality("80")
      .toURL();
    window.open(url, "__blank");
  };

  const setSizes = (m: number, w: number, h: number) => {
    setMenuBarHeight(m);
    setWidth(w);
    setHeight(h);
  };

  const getShrink = () => {
    if (width <= 1920) {
      return 1;
    } else if (width <= 2048) {
      return 2;
    } else if (width <= 3840) {
      return 4;
    } else {
      return 10;
    }
  };

  return (
    <>
      <section className="flex justify-center mt-8">
        <div className="flex">
          <div className="w-full max-w-xl">
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => setSizes(24, 3840, 2160)}
                >
                  4K
                </button>
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => setSizes(16, 3008, 1692)}
                >
                  3008x1692
                </button>
                <button
                  className="px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => setSizes(19, 2560, 1440)}
                >
                  2560x1440
                </button>
                <button
                  className="px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => setSizes(24, 1920, 1080)}
                >
                  HD
                </button>
                <button
                  className="px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => setSizes(24, 1504, 846)}
                >
                  1504x846
                </button>
              </div>
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
              <div className="flex flex-col text-xs text-left">
                <p className="text-gray-500 ">* Due to URL limits 8x8 is max</p>
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
                  onClick={() => generateDownload()}
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
              <div
                className="cursor-pointer "
                onClick={() => generateDownload()}
              >
                <AdvancedImage
                  cldImg={getCloudinaryImage({
                    menuBarHeight,
                    width,
                    height,
                    getScreenHeight,
                    getScreenMargin,
                    getBoxSize,
                    rows,
                    columns,
                    shrink: getShrink(),
                  })}
                  plugins={[placeholder({ mode: "blur" })]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
