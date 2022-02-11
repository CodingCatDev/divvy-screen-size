import { useState } from "react";

export default function Index() {
  const [menuBarHeight, setMenuBarHeight] = useState(24);
  const [width, setWidth] = useState(3840);
  const [height, setHeight] = useState(2160);
  return (
    <section className="flex justify-center h-screen place-items-center">
      <div className="w-full max-w-xs">
        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="menuBarHeight"
            >
              Menu Bar Height (in Pixels)
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
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="height"
            >
              Screen Height (in Pixels)
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
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="width"
            >
              Screen Width (in Pixels)
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

          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button"
            >
              Get Divvy Layout
            </button>
          </div>
        </form>
        <p className="text-xs text-center text-gray-500">
          &copy;2022 CodingCat.dev All rights reserved.
        </p>
        <p className="text-xs text-center text-gray-500">
          (well not really steal all this code please!)
        </p>
        <p className="text-xs text-center text-gray-500">
          <a href="">GitHub Link</a>
        </p>
      </div>
    </section>
  );
}
