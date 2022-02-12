import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

const Data = ({
  menuBarHeight,
  width,
  height,
  getScreenWidth,
  getScreenHeight,
  getScreenMargin,
  getBoxSize,
}: {
  menuBarHeight: number;
  width: number;
  height: number;
  getScreenWidth: () => number;
  getScreenHeight: () => number;
  getScreenMargin: () => number;
  getBoxSize: () => { width: number; height: number };
}) => {
  return (
    <div className="my-2">
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
              <span>Data</span>
              <ChevronUpIcon
                className={`${
                  open ? "" : "transform rotate-180"
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
                      Math.round((getBoxSize().width + Number.EPSILON) * 100) /
                      100
                    ).toFixed(2)}
                    {" x "}
                    {(
                      Math.round((getBoxSize().height + Number.EPSILON) * 100) /
                      100
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
export default Data;
